import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CombineRules = () => {
    const [rules, setRules] = useState([]);
    const [selectedRule1, setSelectedRule1] = useState('');
    const [selectedRule2, setSelectedRule2] = useState('');
    const [combinedAST, setCombinedAST] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all rules when the component mounts
        const fetchRules = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getrules');
                setRules(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchRules();
    }, []);

    const handleCombine = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/rules/combine', {
                ruleIds: [selectedRule1, selectedRule2]
            });
            setCombinedAST(response.data.combinedAST);
            setError(null);
        } catch (err) {
            setError(err.message);
            setCombinedAST(null);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Combine Rules</h2>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Select Rule 1
                    </label>
                    <select
                        value={selectedRule1}
                        onChange={(e) => setSelectedRule1(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select a rule</option>
                        {rules.map(rule => (
                            <option key={rule._id} value={rule._id}>{rule.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Select Rule 2
                    </label>
                    <select
                        value={selectedRule2}
                        onChange={(e) => setSelectedRule2(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select a rule</option>
                        {rules.map(rule => (
                            <option key={rule._id} value={rule._id}>{rule.name}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleCombine}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Combine Rules
                </button>
            </div>

            {combinedAST && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">Combined Rule AST</h3>
                    <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(combinedAST, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default CombineRules;