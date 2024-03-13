import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { type NextPage } from "next";

import { RouterOutputs, api } from "~/utils/api";

const CreatePostWizard = () => {
  const { user } = useUser();

  if (!user) return null;
  console.log(user);
  return (
    <div className="flex w-full gap-3">
      <img
        src={user.imageUrl}
        alt="profile image"
        className="h-14 w-14 rounded-full"
      />
      <input
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};
type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="border-b border-slate-400 p-8">
      {post.content}
    </div>
  );
};
// export default function Home() {
const Home: NextPage = () => {
  const user = useUser();

  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Something went wrong!</div>;

  return (
    <>
      <Head>
        <title>Chirp</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4">
            {!user.isSignedIn && (
              <div className="flex justify-center">
                <SignInButton />
              </div>
            )}
            {user.isSignedIn && <CreatePostWizard />}
          </div>
          <div className="flex flex-col">
            {[...data, ...data]?.map((fullPost) => (
              <PostView {...fullPost} key={fullPost.post.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
