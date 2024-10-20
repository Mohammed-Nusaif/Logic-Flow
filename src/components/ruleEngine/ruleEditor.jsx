// src/components/RuleEngine/RuleEditor.jsx
import React, { useState } from 'react';
import axios from 'axios';

const RuleEditor = ({ onRuleCreated }) => {
    const [ruleName, setRuleName] = useState('');
    const [ruleString, setRuleString] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Example rules for reference
    const exampleRules = [
        "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
        "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/rules', {
                name: ruleName,
                ruleString
            });

            console.log('Rule created:', response.data);
            setRuleName('');
            setRuleString('');
            if (onRuleCreated) {
                onRuleCreated(response.data);
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to create rule');
        } finally {
            setLoading(false);
        }
    };

    const loadExampleRule = (rule) => {
        setRuleString(rule);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create New Rule</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Rule Name
                    </label>
                    <input
                        type="text"
                        value={ruleName}
                        onChange={(e) => setRuleName(e.target.value)}
                        placeholder="Enter rule name"
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Rule Definition
                    </label>
                    <textarea
                        value={ruleString}
                        onChange={(e) => setRuleString(e.target.value)}
                        placeholder="Enter rule definition..."
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                        rows="4"
                        required
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? 'Creating...' : 'Create Rule'}
                </button>
            </form>

            <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Example Rules:</h3>
                <div className="space-y-2">
                    {exampleRules.map((rule, index) => (
                        <button
                            key={index}
                            onClick={() => loadExampleRule(rule)}
                            className="text-sm text-indigo-600 hover:text-indigo-800 block"
                        >
                            Load Example {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RuleEditor;