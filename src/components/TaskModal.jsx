import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  Clock,
  Tag,
  AlertCircle,
  CheckCircle,
  Circle,
} from "lucide-react";

const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  editingTask,
  categories,
  isDark,
  selectedDate,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    date: selectedDate || new Date().toISOString().split("T")[0],
    description: "",
    priority: "medium",
    estimatedTime: 60,
    tags: [],
    resources: [],
  });

  const [newTag, setNewTag] = useState("");
  const [newResource, setNewResource] = useState({
    type: "tutorial",
    title: "",
    url: "",
    icon: "📚",
  });
  const [showResourceForm, setShowResourceForm] = useState(false);

  const priorityOptions = [
    { value: "low", label: "Low", color: "text-green-500", icon: Circle },
    {
      value: "medium",
      label: "Medium",
      color: "text-yellow-500",
      icon: AlertCircle,
    },
    { value: "high", label: "High", color: "text-red-500", icon: AlertCircle },
  ];

  const resourceTypes = [
    { value: "tutorial", label: "Tutorial", icon: "📚" },
    { value: "practice", label: "Practice", icon: "💻" },
    { value: "video", label: "Video", icon: "🎥" },
    { value: "article", label: "Article", icon: "📄" },
    { value: "course", label: "Course", icon: "🎓" },
    { value: "platform", label: "Platform", icon: "👥" },
    { value: "guide", label: "Guide", icon: "📋" },
    { value: "book", label: "Book", icon: "📖" },
  ];

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        categoryId: editingTask.categoryId || "",
        date:
          editingTask.date ||
          selectedDate ||
          new Date().toISOString().split("T")[0],
        description: editingTask.description || "",
        priority: editingTask.priority || "medium",
        estimatedTime: editingTask.estimatedTime || 60,
        tags: editingTask.tags || [],
        resources: editingTask.resources || [],
      });
    } else {
      setFormData({
        title: "",
        categoryId: categories[0]?.id || "",
        date: selectedDate || new Date().toISOString().split("T")[0],
        description: "",
        priority: "medium",
        estimatedTime: 60,
        tags: [],
        resources: [],
      });
    }
    setShowResourceForm(false);
    setNewTag("");
    setNewResource({
      type: "tutorial",
      title: "",
      url: "",
      icon: "📚",
    });
  }, [editingTask, categories, isOpen, selectedDate]);

  const handleSubmit = () => {
    if (formData.title.trim() && formData.categoryId) {
      onSave(formData);
      onClose();
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim().toLowerCase())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim().toLowerCase()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const addResource = () => {
    if (newResource.title.trim() && newResource.url.trim()) {
      const resourceTypeData = resourceTypes.find(
        (type) => type.value === newResource.type
      );
      setFormData({
        ...formData,
        resources: [
          ...formData.resources,
          {
            ...newResource,
            icon: resourceTypeData?.icon || "📚",
          },
        ],
      });
      setNewResource({
        type: "tutorial",
        title: "",
        url: "",
        icon: "📚",
      });
      setShowResourceForm(false);
    }
  };

  const removeResource = (index) => {
    setFormData({
      ...formData,
      resources: formData.resources.filter((_, i) => i !== index),
    });
  };

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (action === "addTag") {
        addTag();
      } else if (action === "submit") {
        handleSubmit();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div
        className={`
        ${isDark ? "bg-gray-800/95" : "bg-white/95"} 
        backdrop-blur-sm rounded-2xl 
        w-full max-w-2xl max-h-[95vh] overflow-hidden
        shadow-2xl border 
        ${isDark ? "border-gray-700" : "border-gray-200"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2
            className={`text-xl sm:text-2xl font-bold ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {editingTask ? "Edit Task" : "Add New Task"}
          </h2>
          <button
            onClick={onClose}
            className={`
              p-2 rounded-full transition-colors
              ${
                isDark
                  ? "hover:bg-gray-700 text-gray-300 hover:text-gray-100"
                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              }
            `}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto scrollbar-thin max-h-[calc(95vh-140px)]">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Task Title */}
              <div className="lg:col-span-2">
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Task Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  onKeyPress={(e) => handleKeyPress(e, "submit")}
                  className={`
                    w-full px-4 py-3 border rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                    ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }
                  `}
                  placeholder="Enter task title..."
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Category *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className={`
                    w-full px-4 py-3 border rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                    ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-gray-100"
                        : "bg-white border-gray-300 text-gray-900"
                    }
                  `}
                  required
                >
                  <option value="">Select Category</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className={`
                    w-full px-4 py-3 border rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                    ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-gray-100"
                        : "bg-white border-gray-300 text-gray-900"
                    }
                  `}
                  required
                />
              </div>

              {/* Priority */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {priorityOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, priority: option.value })
                        }
                        className={`
                          flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm
                          ${
                            formData.priority === option.value
                              ? isDark
                                ? "border-blue-500 bg-blue-900/20 ring-2 ring-blue-800"
                                : "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                              : isDark
                              ? "border-gray-600 hover:border-gray-500 hover:bg-gray-700/50"
                              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                          }

                        `}
                      >
                        <IconComponent size={16} className={option.color} />
                        <span
                          className={isDark ? "text-gray-200" : "text-gray-700"}
                        >
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Estimated Time */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <Clock size={16} className="inline mr-1" />
                  Estimated Time (minutes)
                </label>
                <input
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estimatedTime: parseInt(e.target.value) || 0,
                    })
                  }
                  className={`
                    w-full px-4 py-3 border rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                    ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-gray-100"
                        : "bg-white border-gray-300 text-gray-900"
                    }
                  `}
                  min="0"
                  step="15"
                  placeholder="60"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className={`
                  w-full px-4 py-3 border rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                  resize-none
                  ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }
                `}
                placeholder="Add task description..."
              />
            </div>

            {/* Tags */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <Tag size={16} className="inline mr-1" />
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 ml-1"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, "addTag")}
                  className={`
                    flex-1 px-3 py-2 border rounded-lg text-sm
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                    ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }
                  `}
                  placeholder="Add tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Resources */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Resources
              </label>

              {/* Existing Resources */}
              {formData.resources.length > 0 && (
                <div className="space-y-2 mb-4">
                  {formData.resources.map((resource, index) => (
                    <div
                      key={index}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg border
                        ${
                          isDark
                            ? "border-gray-600 bg-gray-700/50"
                            : "border-gray-200 bg-gray-50"
                        }
                      `}
                    >
                      <span className="text-lg flex-shrink-0">
                        {resource.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-medium text-sm ${
                            isDark ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {resource.title}
                        </div>
                        <div
                          className={`text-xs truncate ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {resource.url}
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded capitalize flex-shrink-0 ${
                          isDark
                            ? "bg-gray-600 text-gray-300"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {resource.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeResource(index)}
                        className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Resource Form */}
              {showResourceForm ? (
                <div
                  className={`
                  p-4 border rounded-lg space-y-3
                  ${
                    isDark
                      ? "border-gray-600 bg-gray-700/30"
                      : "border-gray-300 bg-gray-50"
                  }
                `}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        className={`block text-xs font-medium mb-1 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Type
                      </label>
                      <select
                        value={newResource.type}
                        onChange={(e) => {
                          const selectedType = resourceTypes.find(
                            (type) => type.value === e.target.value
                          );
                          setNewResource({
                            ...newResource,
                            type: e.target.value,
                            icon: selectedType?.icon || "📚",
                          });
                        }}
                        className={`
                          w-full px-3 py-2 border rounded text-sm
                          ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-gray-100"
                              : "bg-white border-gray-300 text-gray-900"
                          }
                        `}
                      >
                        {resourceTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className={`block text-xs font-medium mb-1 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        value={newResource.title}
                        onChange={(e) =>
                          setNewResource({
                            ...newResource,
                            title: e.target.value,
                          })
                        }
                        className={`
                          w-full px-3 py-2 border rounded text-sm
                          ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                          }
                        `}
                        placeholder="Resource title..."
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className={`block text-xs font-medium mb-1 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      URL
                    </label>
                    <input
                      type="url"
                      value={newResource.url}
                      onChange={(e) =>
                        setNewResource({ ...newResource, url: e.target.value })
                      }
                      className={`
                        w-full px-3 py-2 border rounded text-sm
                        ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }
                      `}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={addResource}
                      disabled={
                        !newResource.title.trim() || !newResource.url.trim()
                      }
                      className={`
                        px-3 py-1 rounded text-sm font-medium transition-colors
                        ${
                          !newResource.title.trim() || !newResource.url.trim()
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }
                      `}
                    >
                      Add Resource
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowResourceForm(false)}
                      className={`px-3 py-1 border rounded text-sm transition-colors ${
                        isDark
                          ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                          : "border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowResourceForm(true)}
                  className={`
                    w-full p-3 border-2 border-dashed rounded-lg transition-colors flex flex-col items-center
                    ${
                      isDark
                        ? "border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300 hover:bg-gray-700/30"
                        : "border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  <Plus size={20} className="mb-1" />
                  <div className="text-sm">Add Resource</div>
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className={`
                  flex-1 py-3 px-4 border rounded-lg transition-colors font-medium
                  ${
                    isDark
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!formData.title.trim() || !formData.categoryId}
                className={`
                  flex-1 py-3 px-4 rounded-lg transition-all shadow-lg font-medium
                  ${
                    !formData.title.trim() || !formData.categoryId
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  }
                `}
              >
                {editingTask ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
