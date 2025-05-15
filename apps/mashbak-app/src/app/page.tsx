// function urlBase64ToUint8Array(base64String: string) {
//     const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
//     const base64 = (base64String + padding)
//         .replace(/\\-/g, '+')
//         .replace(/_/g, '/')
//
//     const rawData = window.atob(base64)
//     const outputArray = new Uint8Array(rawData.length)
//
//     for (let i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i)
//     }
//     return outputArray
// }
//
// function PushNotificationManager() {
//     const [isSupported, setIsSupported] = useState(false)
//     const [subscription, setSubscription] = useState<PushSubscription | null>(
//         null
//     )
//     const [message, setMessage] = useState<string>('')
//
//     useEffect(() => {
//         if ('serviceWorker' in navigator && 'PushManager' in window) {
//             setIsSupported(true)
//             registerServiceWorker()
//         }
//     }, [])
//
//     async function registerServiceWorker() {
//         const registration = await navigator.serviceWorker.register('/sw.js', {
//             scope: '/',
//             updateViaCache: 'none',
//         })
//         const sub = await registration.pushManager.getSubscription()
//         setSubscription(sub)
//     }
//
//     async function subscribeToPush() {
//         const registration = await navigator.serviceWorker.ready
//         const sub = await registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: urlBase64ToUint8Array(
//                 process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
//             ),
//         })
//         setSubscription(sub)
//         await subscribeUser(sub)
//     }
//
//     async function unsubscribeFromPush() {
//         await subscription?.unsubscribe()
//         setSubscription(null)
//         await unsubscribeUser()
//     }
//
//     async function sendTestNotification() {
//         if (subscription) {
//             await sendNotification(message)
//             setMessage('')
//         }
//     }
//
//     if (!isSupported) {
//         return <p>Push notifications are not supported in this browser.</p>
//     }
//
//     return (
//         <div>
//             <h3>Push Notifications</h3>
//             {subscription ? (
//                 <>
//                     <p>You are subscribed to push notifications.</p>
//                     <button onClick={unsubscribeFromPush}>Unsubscribe</button>
//                     <input
//                         type="text"
//                         placeholder="Enter notification message"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                     />
//                     <button onClick={sendTestNotification}>Send Test</button>
//                 </>
//             ) : (
//                 <>
//                     <p>You are not subscribed to push notifications.</p>
//                     <button onClick={subscribeToPush}>Subscribe</button>
//                 </>
//             )}
//         </div>
//     )
// }
import { HomeCard } from "@/components/Card/HomeCard";
import { jobsItem } from "@/data/jobs";
import { JobItem } from "@/components/Job/JobItem";
import { eventsItems } from "@/data/events";
import { EventItem } from "@/components/Event/EventItem";
import { membersItems } from "@/data/members";
import { MembersCard } from "@/components/Card/MembersCard";
import { pollItem } from "@/data/poll";
import { PollItem } from "@/components/Poll/PollItem";
import {
  BallotIcon,
  Diversity3Icon,
  EventIcon,
  QuestionAnswerIcon,
  WorkIcon,
} from "./icon.logic";

export default function Home() {
  const cards = [
    {
      icon: QuestionAnswerIcon,
      label: "نقاش",
      path: "discussion",
      content: (
        <div>
          <h1>نقاش</h1>
          <p>Discussion content goes here.</p>
        </div>
      ),
    },
    {
      icon: BallotIcon,
      label: "تصويت",
      path: "poll",
      content: pollItem
        .slice(0, 3)
        .map(({ question, totalAnswers, id }, index) => (
          <PollItem
            key={index}
            id={id}
            question={question}
            totalVotes={totalAnswers}
          />
        )),
    },
    {
      icon: WorkIcon,
      label: "شغل",
      path: "jobs",
      content: jobsItem.map(({ logo, position, company }, index) => (
        <JobItem
          key={index}
          logo={logo}
          position={position}
          company={company}
          path={""}
        />
      )),
    },
    {
      icon: EventIcon,
      label: "احداث",
      path: "event",
      content: eventsItems.map(
        ({ name, image, location, registration, date }, index) => (
          <EventItem
            userNumber={25}
            key={index}
            name={name}
            location={location}
            image={image}
            date={date}
            registration={registration}
            id={"23"}
          />
        ),
      ),
    },
    {
      icon: Diversity3Icon,
      label: "مجموعتي",
      path: "group",
      content: <MembersCard members={membersItems} />,
    },
  ];
  return (
    <>
      <main style={{ padding: "10px" }}>
        {cards.map(({ label, path, content, icon }, index) => (
          <HomeCard key={index} path={path} label={label} Icon={icon}>
            {content}
          </HomeCard>
        ))}
      </main>
      <footer></footer>
    </>
  );
}
