import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RuleList = ({ onRuleSelect, refreshTrigger }) => {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRules();
    }, [refreshTrigger]);
    
    const fetchRules = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/getrules');
            setRules(response.data);
            console.log('responce', response.data)
        } catch (error) {
            setError('Failed to fetch rules');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (ruleId) => {
        try {
            await axios.delete(`http://localhost:5000/api/rules/${ruleId}`);
            fetchRules();
        } catch (error) {
            setError('Failed to delete rule');
        }
    };

    if (loading) return <div>Loading rules...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Existing Rules</h2>
            <div className="space-y-4">
                {rules.map((rule) => (
                    <div
                        key={rule._id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                        <h3 className="font-medium">{rule.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{rule.ruleString}</p>
                        <div className="mt-2 space-x-2">
                            <button
                                onClick={() => onRuleSelect(rule)}
                                className="text-sm text-indigo-600 hover:text-indigo-800"
                            >
                                Evaluate
                            </button>
                            <button
                                onClick={() => handleDelete(rule._id)}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default RuleList;