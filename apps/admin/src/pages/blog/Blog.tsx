import { Button, Container, Grid, Stack, Typography } from "@mui/material"
import { useModal } from "../../hooks/useModal";
import ShowSkeleton from "../../components/Skeleton/ShowSkeleton";
import { Table } from "../../components/Table/GenericTable";
import { getNewsTableColumn } from "./NewsTableColumn";
import { useMemo, useState } from "react";
import { useMessageDialog } from "../../components/MessageDialog/MessageDialog";
import { toast } from "react-toastify";
import { Delete } from "@mui/icons-material";
import { NewsSource } from "../../components/Forms/News/types";
import { useGetNews } from "../../api/newsRequest/getNews";
import NewsForm from "../../components/Forms/News/NewsForm";
import { useDeleteNews } from "../../api/newsRequest/deleteNews";
import CardV2 from "../../components/Card/CardV2";


const CloudManagementPage = () => {
  const { Modal , open, isOpen, close } = useModal()
  const news = useGetNews()
  const [selectedSource, setSelectedSource] = useState<NewsSource | null>(null)
  const deleteNews = useDeleteNews()
  const { MessageDialog: DeleteDialog, close: closeDeleteDialog, open: openDeleteDialog, isOpen: isOpenDeleteDialog } = useMessageDialog()

  const handleEditClick = (source: NewsSource) => {
    setSelectedSource(source)
    open()
  }

  const handleDeleteClick = (source: NewsSource) => {
    setSelectedSource(source)
    openDeleteDialog()
  }

  const onActionPerformed = () => {
    if(selectedSource){
      setSelectedSource(null)
    } else {
      close()
    }
  }

  const NewsTableColumn = useMemo(() => {
    return getNewsTableColumn(handleEditClick, handleDeleteClick);
  }, [news.isLoading,]);

  const deleteNewsFromServer = async () => {
    if (!selectedSource?.id) {
      toast.error('News ID is required')
      return
    }
    await deleteNews.mutateAsync(selectedSource.id)
    news.refetch()
    onActionPerformed()
    closeDeleteDialog()
  }


  const ctfCards = useMemo(() => ([
    { title: "News", value: news.data?.length },
    { title: "Comming Soon", value: '----' },
    { title: "Comming Soon", value: '----' },
  ]), [news.data]);

  const handleAddNewRegion = () => {
    setSelectedSource(null)
    open()
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {ctfCards.map(({ title, value }, index) => (
          <Grid item xs={12} sm={3} md={6} lg={4} key={index}>
            {
                <CardV2
                  title={
                    <Stack>
                      <Typography variant="h6">{title}</Typography>
                      <Typography variant="h5">{value}</Typography>
                    </Stack>
                  }
                />
              }
          </Grid>
        ))}

        <Grid item xs={12}>
          <Stack direction={'row'} width={'100%'} alignItems={'center'} justifyContent={'space-between'} spacing={2} mt={4}>
            <Typography sx={{ color: 'text.primary' }} variant="h6">News Sources</Typography>
            <Stack direction={'row'} width={'100%'} justifyContent={'end'} spacing={2} mt={4}>
              <Button size="small" variant="contained" onClick={handleAddNewRegion}>
                Add New Source
              </Button>
            </Stack>
          </Stack>
        </Grid>

        {
          <Grid item xs={12}>
            <Stack direction={'row'} spacing={2}>
              <Stack width='100%' spacing={1}>
                <Typography sx={{ color: 'text.primary' }} variant="body1">News Sources</Typography>
                {
                  news.isLoading ?
                    <ShowSkeleton viewType="table" /> :
                    <Table data={news.data || []} columnsProp={NewsTableColumn} />
                }
              </Stack>
            </Stack>
          </Grid>
        }

      </Grid>

      {
        isOpen &&
        <Modal title={"News Form"} showCloseIcon open={isOpen}>
          <NewsForm onActionPerformed={onActionPerformed} selectedSource={selectedSource} />
        </Modal>
      }

      {
        isOpenDeleteDialog &&
        <DeleteDialog
          title="Delete News Source"
          description='Are you sure you want to delete this source ?'
          icon={<Delete />}
          action={
            <Button variant="contained" onClick={deleteNewsFromServer} disabled={deleteNews.isPending} color="error">{deleteNews.isPending ? 'Deleting':'Delete'}</Button>
          }
        />
      }
    </Container>
  )
}

export default CloudManagementPage