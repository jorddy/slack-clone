import AppLayout from "@/components/app-layout";
import { authorize } from "@/utils/authorize";

export { authorize as getServerSideProps };

export default function Index() {
  return (
    <AppLayout>
      <section className='mt-16 col-span-4 grid place-content-center h-full'>
        <h1>Click a room to see messages</h1>
      </section>
    </AppLayout>
  );
}
