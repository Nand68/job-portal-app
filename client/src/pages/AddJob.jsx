import React, { useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current?.root.innerHTML || '';

      const { data } = await axios.post(
        `${backendUrl}/api/company/post-job`,
        { title, description, salary, location, category, level },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setSalary(0);
        if (quillRef.current) quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred!');
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      const quillInstance = new Quill(editorRef.current, { theme: 'snow' });
      quillRef.current = quillInstance;
    }
  }, []);

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="container p-4 flex flex-col w-full items-start gap-3"
      >
        <div className="w-full">
          <p className="mb-2">Job Title</p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type here"
            type="text"
            value={title}
            required
            className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
          />
        </div>

        <div className="w-full max-w-lg">
          <p className="my-2">Job Description</p>
          <div ref={editorRef} className="border-2 border-gray-300 rounded p-2 min-h-[150px]"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Job Category</p>
            <select
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {JobCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-2">Job Location</p>
            <select
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            >
              {JobLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-2">Job Level</p>
            <select
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              onChange={(e) => setLevel(e.target.value)}
              value={level}
            >
              <option value="Beginner level">Beginner level</option>
              <option value="Intermediate level">Intermediate level</option>
              <option value="Senior level">Senior level</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Job Salary</p>
            <input
              min={0}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]"
              onChange={(e) => setSalary(Number(e.target.value))}
              type="number"
              placeholder="25000"
              value={salary}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-28 py-3 mt-4 bg-black text-white rounded self-start"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddJob;
 