import AddDocumentBtn from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import Header from '@/components/Header'
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import AddCategory from "@/components/AddCategory";

const Home = async () => {
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);
  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn 
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          {roomDocuments.data.lengtgh === 0 && <div className="flex justify-center items-center gap-4 w-full">
            <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
              <Image
                  src="/assets/icons/doc.svg"
                  alt="file"
                  width={40}
                  height={40}
              />
            </div>
            <div className="space-y-1">
              <p className="line-clamp-1 text-lg">No documents found</p>
              <p className="line-clamp-1 text-sm">Create a new document to start collaborating</p>
            </div>
          </div>}
          <ul className="document-ul">
            {roomDocuments.data.map(({id, metadata, createdAt, userId}: any) => (
                <li key={id} className="document-list-item">
                  <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                    <div className="hidden rounded-md p-2 sm:block">
                      <Image
                          src="/assets/icons/doc.svg"
                          alt="file"
                          width={40}
                      height={40}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg">{metadata.title}</p>
                    <p className="line-clamp-1 text-sm">{metadata.email}</p>
                    <p className="line-clamp-1 text-sm">{metadata.category}</p>

                    <p className="text-sm font-light text-gray-600">Created about {dateConverter(createdAt)}</p>
                  </div>
                </Link>
                  <div className="flex justify-between items-center">
                    <DeleteModal roomId={id} />

                    <AddCategory roomId={id} metadata={metadata} />



                  </div>

              </li>
            ))}
          </ul>
        </div>
      ): (
          <div className="flex w-full flex-col items-center justify-center gap-5 rounded-lg  px-10 py-8">
            <Image
                src="/assets/icons/doc.svg"
                alt="Document"
                width={40}
                height={40}
                className="mx-auto"
            />
            <div className="space-y-1">
              <p className="text-center">No documents found</p>
              <p className="text-center">Create a new document to start collaborating</p>
            </div>
            <AddDocumentBtn
                userId={clerkUser.id}
                email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
      )}
    </main>
  )
}

export default Home