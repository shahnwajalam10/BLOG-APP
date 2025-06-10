import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, SetEditPost] = useState(false);
  const [selectedPost, SetSelectedPost] = useState("");
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");


  useEffect(() => {
    getPosts();
  }, [posts]);

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/get-blogs");
    const data = await response.json();
    setPosts(data.blogs);
  };

  const deletePost = async (id) => {
    const response = await fetch(`http://localhost:5000/delete-blog/${id}`, {
      method: "DELETE",
    });
    if (response.status == 200) {
      toast.success("Blog deleted successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  const updatePost = async (id) => {
    console.log(title,description,id);

    const response=await fetch (`http://localhost:5000/update-blog/${id}`,{
      method: "PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({title,description}),
    });
    if(response.status===200){
      toast.success("Blog updated successfully");
    }
    else{
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {" "}
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="my-10 flex flex-col gap-10">
        {posts.map((post) => {
          return (
            <div
              className="w-[40vw] mx-auto p-3 rounded-md shadow-md"
              key={post._id}
            >
              <div className="flex justify-end text-lg gap-3  ">
                <AiFillDelete
                  className="text-gray-400 hover:text-purple-400 cursor-pointer 
            hover:scale-110 transition-all"
                  onClick={() => deletePost(post._id)}
                />
                <MdOutlineEdit
                  className={`${
                    selectedPost === post._id && editPost
                      ? "text-purple-400 scale-110"
                      : "text-gray-400"
                  } text-gray-400 hover:text-purple-400 cursor-pointer
            hover:scale-110 transition-all`}
                  onClick={() => {
                    SetEditPost(!editPost);
                    SetSelectedPost(post._id);
                  }}
                />
              </div>
              <h2 className="text-lg font-bold my-1
               outline-none focus:bg-gray-100" contentEditable={editPost}
              onInput={(e)=>setTitle(e.target.innerText)}>
                {post.title}
              </h2>
              <h3
                className="text-gray-500 font-semibold selection:bg-purple-300
                 outline-none focus:bg-gray-200"contentEditable={editPost}
                onInputCapture={(e)=>setDescription(e.target.innerText)}>
                {post.description}
              </h3>
              <button
                className={`${
                  selectedPost === post._id && editPost ? "block" : "hidden"
                } bg-purple-400 
              hover:bg-purple-600 px-3 py-1 rounded-md my-1 font-bold text-white`}
                onClick={() => updatePost(post._id)}
              >
                Save
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;