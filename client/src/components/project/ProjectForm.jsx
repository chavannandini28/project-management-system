import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createProject,
  updateProject,
} from "../../redux/project/projectSlice";

import {
  fetchUsers,
} from "../../redux/user/userSlice";

import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Select from "../common/Select";
import Button from "../common/Button";

const ProjectForm = ({
  editMode = false,
  project = null,
  onSuccess,
}) => {

  const dispatch = useDispatch();

  const { users } = useSelector(
    (state) => state.user
  );

  const { loading } = useSelector(
    (state) => state.project
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    startDate: "",
    endDate: "",
    members: [],
    image: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {

    if (editMode && project) {

      setFormData({
        name: project.name || "",
        description: project.description || "",
        status: project.status || "Pending",
        priority: project.priority || "Medium",
        startDate: project.startDate
          ? project.startDate.substring(0, 10)
          : "",
        endDate: project.endDate
          ? project.endDate.substring(0, 10)
          : "",
        members: project.members || [],
        image: null,
      });

    }

  }, [editMode, project]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("status", formData.status);
    data.append("priority", formData.priority);
    data.append("startDate", formData.startDate);
    data.append("endDate", formData.endDate);

    formData.members.forEach((member) => {
      data.append("members", member);
    });

    if (formData.image) {
      data.append("image", formData.image);
    }

    if (editMode) {
      await dispatch(
        updateProject({
          id: project._id,
          projectData: data,
        })
      ).unwrap();
    } else {
      await dispatch(
        createProject(data)
      ).unwrap();
    }

    setFormData({
      name: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      startDate: "",
      endDate: "",
      members: [],
      image: null,
    });

    setErrors({});

    if (onSuccess) {
      onSuccess();
    }

  } catch (error) {
    console.error(error);
  }
};


  return (

    <form className="bg-white rounded-xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-8">

        {editMode
          ? "Update Project"
          : "Create Project"}

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Input
          label="Project Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Project Name"
          required
          error={errors.name}
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            {
              value: "Pending",
              label: "Pending",
            },
            {
              value: "In Progress",
              label: "In Progress",
            },
            {
              value: "Completed",
              label: "Completed",
            },
            {
              value: "Cancelled",
              label: "Cancelled",
            },
          ]}
        />

        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={[
            {
              value: "Low",
              label: "Low",
            },
            {
              value: "Medium",
              label: "Medium",
            },
            {
              value: "High",
              label: "High",
            },
          ]}
        />

        <Input
          type="date"
          label="Start Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />

        <Input
          type="date"
          label="End Date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />

      </div>

      <div className="mt-6">

        <TextArea
          label="Project Description"
          name="description"
          rows={6}
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter project description..."
          error={errors.description}
        />

      </div>

            {/* Team Members */}

      <div className="mt-8">

        <label className="block text-sm font-semibold mb-3">
          Assign Team Members
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border rounded-lg p-4">

          {users?.length > 0 ? (
            users.map((user) => (

              <label
                key={user._id}
                className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-100"
              >

                <input
                  type="checkbox"
                  checked={formData.members.includes(user._id)}
                  onChange={(e) => {

                    if (e.target.checked) {

                      setFormData((prev) => ({
                        ...prev,
                        members: [...prev.members, user._id],
                      }));

                    } else {

                      setFormData((prev) => ({
                        ...prev,
                        members: prev.members.filter(
                          (id) => id !== user._id
                        ),
                      }));

                    }

                  }}
                />

                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>

                  <p className="font-medium">
                    {user.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>

                </div>

              </label>

            ))
          ) : (
            <p className="text-gray-500">
              No users found.
            </p>
          )}

        </div>

      </div>

      {/* Project Image */}

      <div className="mt-8">

        <label className="block text-sm font-semibold mb-3">
          Project Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              image: e.target.files[0],
            }))
          }
          className="w-full border rounded-lg p-3"
        />

        {formData.image && (

          <div className="mt-5">

            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="w-40 h-40 rounded-lg object-cover border"
            />

          </div>

        )}

      </div>

            {/* Buttons */}

      <div className="mt-10 flex flex-wrap justify-end gap-4">

        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={loading}
        >
          {editMode
            ? "Update Project"
            : "Create Project"}
        </Button>

      </div>

    </form>
  );
};

export default ProjectForm;