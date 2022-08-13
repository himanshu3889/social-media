import React, { useEffect, useState } from "react";
import { SanityAssetDocument } from "@sanity/client";
import { useRouter } from "next/router";
import axios from "axios";

import useAuthStore from "../store/authStore";
import { client } from "../configs/client";
import { topics } from "../utils/constants";
import { BASE_URL } from ".";

const Upload = () => {
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState<String>(topics[0].name);
  const [loading, setLoading] = useState<Boolean>(false);
  const [savingPost, setSavingPost] = useState<Boolean>(false);
  const [fileAsset, setFileAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setWrongFileType] = useState<Boolean>(false);

  const userProfile: any = useAuthStore((state) => state.userProfile);
  const router = useRouter();
  const videoFileTypes = ["video/mp4", "video/webm", "video/ogg"];
  const imageFileTypes = ["image/jpeg", "image/png"];

  useEffect(() => {
    if (!userProfile) router.push("/");
  }, [userProfile, router]);

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];

    // restrict the file size
    const maxSize = 30 * 1024 * 1024; // bytes
    if (selectedFile && selectedFile.size > maxSize) {
      window.alert(
        `file size should be less than ${maxSize / 1024 / 1024} MB `
      );
      return;
    }

    // uploading asset to sanity
    if (
      videoFileTypes.includes(selectedFile.type) ||
      imageFileTypes.includes(selectedFile.type)
    ) {
      setWrongFileType(false);
      setLoading(true);

      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setFileAsset(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (description && fileAsset?._id && topic) {
      setSavingPost(true);

      const doc = {
        _type: "post",
        description,
        createdAt:new Date(),
        file: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: fileAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic,
      };

      await axios.post(`${BASE_URL}/api/post`, doc);

      router.push("/");
    }
  };

  const handleDiscard = () => {
    setSavingPost(false);
    setFileAsset(undefined);
    setDescription("");
    setTopic("");
  };
  

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className=" bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Image or Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video or Image to your account
            </p>
          </div>
          {!fileAsset ? (
            <div className="border-dashed rounded-xl border-4 border-gray-200  cursor-pointer hover:border-red-300 hover:bg-gray-100 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[370px] p-10">
              {loading ? (
                <p className="text-center text-2xl text-blue-500 font-semibold">
                  Uploading...
                </p>
              ) : (
                <div>
                  <label className="cursor-pointer">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center  ">
                      <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        <img
                          className="has-mask h-36 object-center"
                          src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&amp;ext=jpg"
                          alt="freepik image"
                        />
                      </div>
                      <p className="pointer-cursor font-semibold text-gray-500 ">
                        Please select
                        <br /> Image or Video files
                        <br /> Less than 30 MB
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={(e) => uploadVideo(e)}
                      className="w-0 h-0"
                    />
                  </label>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center outline-none mt-10 w-[400px] h-[370px] p-10">
              <div className=" rounded-3xl p-4 flex flex-col gap-2 justify-center items-center">
                {videoFileTypes.includes(fileAsset.mimeType) ? (
                  <video
                    className="border-2 border-double border-gray-400 rounded-xl w-[400px] h-[370px] bg-black"
                    controls
                    loop
                    src={fileAsset?.url}
                  />
                ) : (
                  <img
                    className="border-2 border-double border-gray-400 rounded-xl w-[400px] h-[370px] bg-black"
                    src={fileAsset?.url}
                    alt="Post Image"
                  />
                )}
                <div className="text-red-600">
                  <span className="text-sm">
                    {fileAsset.originalFilename?.slice(0, 30)}
                  </span>
                  <button
                    type="button"
                    className="ml-2 rounded-full bg-gray-200 text-red-400 hover:text-red-700 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setFileAsset(undefined)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {wrongFileType && (
            <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
              Please select an <br />
              Image (jpg, png, jpeg)
              <br />
              or
              <br />
              video file (mp4, webm, ogg)
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium ">Description</label>
          <div className="w-full md:w-full mb-2">
            <textarea
              className="resize-vertically rounded border-2 border-gray-200 leading-normal text-gray-800 w-full h-20 py-2 px-3 font-medium focus:border-gray-700 focus:bg-gray-50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="comment"
              placeholder="Type Your Comment . . . ."
              required
            />
          </div>

          <label className="text-md font-medium ">Choose a topic</label>
          <select
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            className="focus:border-gray-700 lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
          >
            {topics.map((item) => (
              <option
                key={item.name}
                className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-6 mt-10">
            <button
              onClick={handleDiscard}
              type="button"
              className="border-gray-300 hover:bg-gray-300 border-2 bg-gray-200 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              disabled={fileAsset?.url ? false : true}
              onClick={handlePost}
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white text-md font-medium p-2 rounded w-28 lg:w-44 cursor-pointer outline-none"
            >
              {savingPost ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
