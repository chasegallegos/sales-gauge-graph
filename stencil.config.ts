import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'merakiusergoals',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  bundles: [
    { components: ['user-goals-form'] },
    { components: ['user-goals-gauge'] },
    { components: ['user-goals-container'] }
  ]
};
