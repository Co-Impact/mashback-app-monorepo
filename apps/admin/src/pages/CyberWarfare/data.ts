export const programData = [
  {
    name: "Cyber Defense Bootcamp",
    host: { id: "b001", name: "SecureTech Ltd." },
    cyberWarefareTasks: [
      { name: "Network Intrusion Detection" },
      { name: "Firewall Configuration" }
    ],
    sessions: [
      { id: "s001", userId: "u001" },
      { id: "s002", userId: "u002" }
    ],
    isActive: true
  },
  {
    name: "Offensive Security Training",
    host: { id: "b002", name: "RedOps Security" },
    cyberWarefareTasks: [
      { name: "Penetration Testing" },
      { name: "Privilege Escalation" }
    ],
    sessions: [
      { id: "s003", userId: "u003" }
    ],
    isActive: false
  },
  {
    name: "Threat Intelligence 101",
    host: { id: "b003", name: "CyberIntel Co." },
    cyberWarefareTasks: [
      { name: "OSINT Gathering" },
      { name: "Malware Analysis" },
      { name: "Log Correlation" }
    ],
    sessions: [
      { id: "s004", userId: "u004" },
      { id: "s005", userId: "u005" },
      { id: "s006", userId: "u006" }
    ],
    isActive: true
  },
  {
    name: "Blue Team Foundations",
    host: { id: "b001", name: "SecureTech Ltd." },
    cyberWarefareTasks: [{ name: "SIEM Tuning" }],
    sessions: [],
    isActive: true
  },
  {
    name: "Cybersecurity Simulation Lab",
    host: { id: "b004", name: "DefendOps Inc." },
    cyberWarefareTasks: [
      { name: "Incident Response" },
      { name: "Forensic Imaging" }
    ],
    sessions: [
      { id: "s007", userId: "u007" },
      { id: "s008", userId: "u008" }
    ],
    isActive: false
  },
  {
    name: "Advanced Malware Reverse Engineering",
    host: { id: "b005", name: "ZeroDay Labs" },
    cyberWarefareTasks: [
      { name: "Binary Dissection" },
      { name: "Sandbox Analysis" }
    ],
    sessions: [
      { id: "s009", userId: "u009" }
    ],
    isActive: true
  }
];
