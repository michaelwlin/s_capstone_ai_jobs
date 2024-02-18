import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DatabaseView = () => {
    const [data, setData] = useState([]);
    const [dataType, setDataType] = useState('users'); // Default to 'users'
    const [formData, setFormData] = useState({}); // For form data
    const [isEditing, setIsEditing] = useState(false); // To toggle add/edit mode
    const [editId, setEditId] = useState(null); // To store the id of the entity being edited
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackMessageType, setFeedbackMessageType] = useState(''); // 'success' or 'error'

    console.log('API URL:', process.env.REACT_APP_API_URL); // This should log the API URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/${dataType}/`);
                setData(response.data);
                setFeedbackMessage('');
                setFeedbackMessageType('');
            } catch (error) {
                console.error('There was an error fetching the data:', error);
                setFeedbackMessage('Failed to fetch data.');
                setFeedbackMessageType('error');
            }
        };

        fetchData();
    }, [dataType, isEditing]);

    const fetchDataType = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/${dataType}/`);
            setData(response.data);
        } catch (error) {
            console.error('There was an error refreshing the data:', error);
        }
    };

    const handleDataTypeChange = (event) => {
        setDataType(event.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("Updating form data: ", name, value);
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_API_URL}/${dataType}/${editId ? editId + '/' : ''}`;
        const method = editId ? 'PUT' : 'POST';

        try {
            await axios({ method, url, data: formData });
            fetchDataType();
            setIsEditing(false);
            setEditId(null);
            setFormData({});
            setFeedbackMessage(`${isEditing ? 'Updated' : 'Added new'} ${dataType.slice(0, -1)} successfully.`);
            setFeedbackMessageType('success');
        } catch (error) {
            console.error('Error submitting form:', error);
            setFeedbackMessage(`Error ${isEditing ? 'updating' : 'adding'} ${dataType.slice(0, -1)}.`);
            setFeedbackMessageType('error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/${dataType}/${id}/`);
            fetchDataType();
            setFeedbackMessage('Deleted successfully.');
            setFeedbackMessageType('success');
        } catch (error) {
            console.error('Error deleting entity:', error);
            setFeedbackMessage('Error deleting entity.');
            setFeedbackMessageType('error');
        }
    };

    const handleEdit = (entity) => {
        setIsEditing(true);
        setEditId(entity.id);
        setFormData({ ...entity });
        setFeedbackMessage('');
        setFeedbackMessageType('');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-5 bg-white rounded shadow-lg">
                <h1 className="text-xl font-semibold text-center text-gray-800">View Database Content</h1>
                <p className="text-center text-gray-600">API URL: {process.env.REACT_APP_API_URL || 'Not set'}</p>
                <div className="my-4">
                    <select
                        onChange={handleDataTypeChange}
                        value={dataType}
                        className="w-full p-2 text-gray-700 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="users">Users</option>
                        <option value="jobs">Jobs</option>
                        <option value="applications">Applications</option>
                    </select>
                </div>

                {feedbackMessage && (
                    <div className={`mb-4 text-sm font-medium ${feedbackMessageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {feedbackMessage}
                    </div>
                )}

                {/* Form for Add/Edit Operations */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">{isEditing ? "Edit" : "Add New"} {dataType.slice(0, -1)}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {dataType === 'users' && (
                            <input
                                name="userName"
                                value={formData.userName || ''}
                                onChange={handleInputChange}
                                placeholder="Username"
                                className="w-full p-2 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            // Add other user-specific inputs styled similarly
                        )}

                        <button
                            type="submit"
                            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {isEditing ? 'Save Changes' : 'Add New'}
                        </button>
                    </form>
                </div>

                {/* Data Display */}
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded shadow">
                            {/* Include User ID */}
                            <h2 className="text-lg font-semibold text-gray-800">
                                {item.userName || item.title || item.user} - ID: {item._id} {item.status ? `- ${item.status}` : ''}
                            </h2>
                            <p className="text-gray-600">{item.description || item.email || item.job}</p>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="px-3 py-1 text-sm text-red-700 bg-red-100 rounded hover:bg-red-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default DatabaseView;