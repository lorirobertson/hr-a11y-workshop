import { Fragment } from 'react';
import scenario from '@utilities/scenario';

const scenarioMap = {
    baseline: 0,
    stage1: 1,
    stage2: 2,
    stage3: 3,
    complete: 4,
}

const ScenarioDisplay = ({
    minScenario="baseline",
    children,
}) => {
    if ( scenarioMap[scenario] >= scenarioMap[minScenario]) {
        return children;
    }

    return '';
};

const ScenarioTagWrapper = ({
    minScenario="baseline",
    as="",
    original=Fragment,
    children,
}) => {
    const Tag = scenarioMap[scenario] >= scenarioMap[minScenario] ? as : original;
    
    return (
        <Tag>
            {children}
        </Tag>
    );
};

const ScenarioAttributes = (minScenario="baseline", props={}) => {
    if ( scenarioMap[scenario] >= scenarioMap[minScenario]) {
        return props;
    }

    return {};
};

export {
    ScenarioDisplay,
    ScenarioTagWrapper,
    ScenarioAttributes,
};