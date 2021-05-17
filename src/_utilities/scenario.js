const day = new Date().getDay();
let scenario = 'baseline';

switch(day) {
    case 2:
        scenario = 'stage1';
        break;
    case 3:
        scenario = 'stage2';
        break;
    case 4:
        scenario = 'stage3';
        break;
    case 5:
        scenario = 'complete';
        break;
    default:
        scenario = 'baseline';
        break;
}

export default process.env.FORCE_SCENARIO || scenario;