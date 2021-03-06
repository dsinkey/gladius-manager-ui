const steps = [{
  path: '/signup/getting-started',
  name: 'Your information',
}, {
  path: '/signup/get-secure',
  name: 'Protect your data',
}, {
  path: '/signup/add-ether',
  name: 'Add ether',
}, {
  path: '/signup/choose-pool',
  name: 'Choose pool',
}];

export default function reducer() {
  return {
    all: steps,
    byPath: steps.reduce((acc, step, index) => ({
      ...acc,
      [step.path]: index,
    }), {}),
  };
}
