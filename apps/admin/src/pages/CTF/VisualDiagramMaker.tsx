import React, { FC, useCallback, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Button } from '@mui/material';
import CustomNode from './CustomNode';
import CreateNode from './CreateNode';
import { v4 as uuidv4 } from 'uuid';
import { useModal } from '../../hooks/useModal';
import { UseFormSetValue } from 'react-hook-form';
import { CreateCTF } from '../../api/types';

const nodeTypes = {
  customNode: CustomNode,
};

interface VisualDiagramMakerProps {
  setValue: UseFormSetValue<any>;
  close: () => void;
}

const VisualDiagramMaker: FC<VisualDiagramMakerProps> = ({ setValue, close }) => {

  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [editingNode, setEditingNode] = useState<Node | null>(null);

  const onCreateNode = useCallback(
    (data: any) => {
      if (editingNode) {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === editingNode.id
              ? {
                ...node,
                data: {
                  ...data,
                  onEdit: handleEdit,
                  onDelete: handleDelete,
                },
              }
              : node
          )
        );
        setEditingNode(null);
        return;
      }

      const newNode: Node = {
        id: uuidv4(),
        type: 'customNode',
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: {
          ...data,
          onEdit: handleEdit,
          onDelete: handleDelete,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [editingNode]
  );

  const handleEdit = useCallback((id: string) => {
    setNodes((prevNodes) => {
      const node = prevNodes.find((n) => n.id === id);
      if (!node) return prevNodes;

      setEditingNode(node);
      return prevNodes;
    });
  }, []);


  const handleDelete = (id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
  };

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const handleSave = () => {
    const cleanedNodes = nodes.map((node) => {
      const { id, type, position, data } = node;

      const { onEdit, onDelete, icon, ...dataToSave }: any = data;

      return {
        id,
        type,
        position,
        data: dataToSave, // includes iconFile
      };
    });

    const cleanedEdges = edges.map(({ id, source, target, label }) => ({
      id,
      source,
      target,
      label,
    }));

    const diagramData = {
      nodes: cleanedNodes,
      edges: cleanedEdges,
    };

    setValue('diagram', diagramData)

    console.log('🧼 Cleaned Diagram for DB:', diagramData);

    close()
  };


  return (

    <Box minHeight="70vh">
      <ReactFlowProvider>
        <Box mb={2}>
          <CreateNode
            onCreate={onCreateNode}
            initialData={editingNode?.data}
            isEditing={!!editingNode}
            setEditingNode={setEditingNode}
          />
          <Button variant="contained" onClick={handleSave} sx={{ ml: 2 }}>
            Done
          </Button>
        </Box>

        <Box sx={{ height: '70vh', border: '1px solid #ccc', borderRadius: 2 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
            proOptions={{hideAttribution: true}}
          >
            <Background />
          </ReactFlow>
        </Box>
      </ReactFlowProvider>
    </Box>
  );
};

export default VisualDiagramMaker;
