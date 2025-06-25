import { useState } from "react";

interface Video {
  title: string;
  description: string;
  file: File | null;
}

interface CourseFormData {
  title: string;
  price: number;
  description: string;
  thumbnailImage: File | null;
  videos: Video[];
}

export default function AddCourseForm() {
  const [submit, setSubmit] = useState("Submit");
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    price: 0,
    description: "",
    thumbnailImage: null,
    videos: [{ title: "", description: "", file: null }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (index === undefined) {
      setFormData({ ...formData, [name]: value });
    } else {
      const updatedVideos = [...formData.videos];
      updatedVideos[index] = { ...updatedVideos[index], [name]: value };
      setFormData({ ...formData, videos: updatedVideos });
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, files } = e.target;
    if (index === undefined) {
      setFormData({ ...formData, [name]: files ? files[0] : null });
    } else {
      const updatedVideos = [...formData.videos];
      updatedVideos[index] = {
        ...updatedVideos[index],
        [name]: files ? files[0] : null,
      };
      setFormData({ ...formData, videos: updatedVideos });
    }
  };

  const addVideo = () => {
    setFormData({
      ...formData,
      videos: [...formData.videos, { title: "", description: "", file: null }],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit("loading");
    // Perform validation
    if (
      !formData.title ||
      !formData.price ||
      !formData.description ||
      !formData.thumbnailImage
    ) {
      alert("Please fill in all required fields");
      return;
    }

    formData.videos.forEach((video, index) => {
      if (!video.title || !video.description || !video.file) {
        alert(`Please fill in all fields for Video ${index + 1}`);
        return;
      }
    });

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("description", formData.description);
    formDataToSend.append("thumbnailImage", formData.thumbnailImage);

    formData.videos.forEach((video, index) => {
      formDataToSend.append(`videos[${index}][title]`, video.title);
      formDataToSend.append(`videos[${index}][description]`, video.description);
      formDataToSend.append(`videos[${index}][file]`, video.file!); // assuming file is never null after validation
    });

    // Make an API call to submit the data (e.g., using fetch)
    console.log("Form Data Submitted", formDataToSend);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="block font-medium text-gray-700"
                >
                  Course Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 border py-1 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 border py-1 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block font-medium text-gray-700"
              >
                Course Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 border py-1 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="thumbnailImage"
                className="block  font-medium text-gray-700"
              >
                Add Image
              </label>
              <input
                type="file"
                name="thumbnailImage"
                id="thumbnailImage"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="mt-1 block w-full rounded-md shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Upload Your Course Videos
            </label>
            {formData.videos.map((video, index) => (
              <div key={index} className="space-y-4 mt-4">
                <div>
                  <label
                    htmlFor={`videos[${index}][title]`}
                    className="block  font-medium text-gray-700"
                  >
                    Video Title
                  </label>
                  <input
                    type="text"
                    name={`videos[${index}][title]`}
                    value={video.title}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 border py-1 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`videos[${index}][description]`}
                    className="block font-medium text-gray-700"
                  >
                    Video Description
                  </label>
                  <input
                    type="text"
                    name={`videos[${index}][description]`}
                    value={video.description}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 border py-1 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`videos[${index}][file]`}
                    className="block font-medium text-gray-700"
                  >
                    Video File
                  </label>
                  <input
                    type="file"
                    name={`videos[${index}][file]`}
                    onChange={(e) => handleFileChange(e, index)}
                    accept="video/*"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addVideo}
              className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Another Video
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submit == "loading" ? true : false}
            className="py-2 px-4 w-full border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {submit}
          </button>
        </div>
      </form>
    </div>
  );
}
