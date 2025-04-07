import React, { useState } from "react";

export default function App() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      props: {
        text: `${type} content`,
        src: type === "Image" ? "https://via.placeholder.com/150" : "",
        link: ""
      },
    };
    setElements([...elements, newElement]);
  };
  

  const updateProps = (id, propKey, value) => {
    const updatedElements = elements.map((el) =>
      el.id === id ? { ...el, props: { ...el.props, [propKey]: value } } : el
    );
    setElements(updatedElements);

    // 👇 Yeh line add ki gayi hai: selectedElement bhi update hoga
    const updatedSelected = updatedElements.find((el) => el.id === id);
    setSelectedElement(updatedSelected);
  };

  const deleteElement = (id) => {
    setElements(elements.filter((el) => el.id !== id));
    setSelectedElement(null);
  };

  const renderElement = (el) => {
    switch (el.type) {
      case "Text":
        return <p>{el.props.text}</p>;
      case "Image":
        return <img src={el.props.src} alt="" className="max-w-xs" />;
      case "Button":
        return (
          <button className="bg-blue-500 px-4 py-2 text-white">
            {el.props.text}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Add Elements</h2>
        <button onClick={() => addElement("Text")}>Add Text</button>
        <button onClick={() => addElement("Image")}>Add Image</button>
        <button onClick={() => addElement("Button")}>Add Button</button>
        <button onClick={() => setPreviewMode(!previewMode)}>
          {previewMode ? "Back to Edit" : "Preview Website"}
        </button>
      </div>

      {/* Canvas */}
      <div className="w-2/4 p-4 border-r border-l">
        <h2 className="text-xl font-bold mb-2">
          {previewMode ? "Preview" : "Canvas"}
        </h2>
        <div className="space-y-4">
          {elements.map((el) => (
            <div
              key={el.id}
              className={`border p-2 hover:bg-gray-50 cursor-pointer ${
                selectedElement?.id === el.id ? "border-blue-500" : ""
              }`}
              onClick={() => !previewMode && setSelectedElement(el)}
            >
              {renderElement(el)}
            </div>
          ))}
        </div>
      </div>

      {/* Edit Panel */}
      {!previewMode && (
        <div className="w-1/4 p-4 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Edit Element</h2>
          {selectedElement ? (
            <div className="space-y-2">
              {(selectedElement.type === "Text" ||
                selectedElement.type === "Button") && (
                <input
                  value={selectedElement.props.text}
                  onChange={(e) =>
                    updateProps(selectedElement.id, "text", e.target.value)
                  }
                  placeholder="Enter text"
                  className="border p-1 w-full"
                />
              )}
              {selectedElement.type === "Image" && (
                <input
                  value={selectedElement.props.src}
                  onChange={(e) =>
                    updateProps(selectedElement.id, "src", e.target.value)
                  }
                  placeholder="Image URL"
                  className="border p-1 w-full"
                />
              )}
              <button
                className="bg-red-500 px-4 py-2 text-white"
                onClick={() => deleteElement(selectedElement.id)}
              >
                Delete Element
              </button>
            </div>
          ) : (
            <p>Select an element to edit</p>
          )}
        </div>
      )}
    </div>
  );
}
