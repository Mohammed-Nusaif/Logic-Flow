// src/pages/RuleEnginePage.jsx
import React, { useState } from 'react';
import RuleEditor from '../components/ruleEngine/ruleEditor';
import RuleList from '../components/ruleEngine/ruleList';
import RuleEvaluator from '../components/ruleEngine/RuleEvaluator';
import CombineRules from '../components/ruleEngine/ruleCombiner'

const RuleEnginePage = () => {
    const [selectedRule, setSelectedRule] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleRuleCreated = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Rule Engine</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <RuleEditor onRuleCreated={handleRuleCreated} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <RuleList
                            onRuleSelect={setSelectedRule}
                            refreshTrigger={refreshTrigger}
                        />
                        <CombineRules />
                    </div>
                </div>
                <div className="space-y-16">
                    <RuleEvaluator selectedRule={selectedRule} />
                </div>
            </div>
        </div>
    );
};

export default RuleEnginePage;