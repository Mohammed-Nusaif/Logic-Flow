// src/components/RuleEngine/RuleEvaluator.jsx
import React, { useState } from 'react';
import axios from 'axios';

const RuleEvaluator = ({ selectedRule }) => {
    const [data, setData] = useState({
        age: '',
        department: '',
        salary: '',
        experience: ''
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEvaluate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await axios.post('http://localhost:5000/api/rules/evaluate', {
                ruleId: selectedRule._id,
                data: {
                    age: Number(data.age),
                    department: data.department,
                    salary: Number(data.salary),
                    experience: Number(data.experience)
                }
            });

            setResult(response.data.result);
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to evaluate rule');
        } finally {
            setLoading(false);
        }
    };

    if (!selectedRule) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Evaluate Rule: {selectedRule.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{selectedRule.ruleString}</p>

            <form onSubmit={handleEvaluate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Age
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={data.age}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Department
                        </label>
                        <select
                            name="department"
                            value={data.department}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Salary
                        </label>
                        <input
                            type="number"
                            name="salary"
                            value={data.salary}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Experience (years)
                        </label>
                        <input
                            type="number"
                            name="experience"
                            value={data.experience}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                            required
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    {loading ? 'Evaluating...' : 'Evaluate Rule'}
                </button>
            </form>

            {result !== null && (
                <div className={`mt-4 p-4 rounded-md ${result ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    Rule evaluation result: <strong>{result ? 'TRUE' : 'FALSE'}</strong>
                </div>
            )}
        </div>
    );
};

export default RuleEvaluator;