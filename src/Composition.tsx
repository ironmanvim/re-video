import * as React from 'react';

export interface CompositionProps {
  name: string;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  component: React.FunctionComponent;
}

export const Composition: React.FC<CompositionProps> = ({
  name,
  durationInFrames,
  fps,
  width,
  height,
  component,
}) => {
  const Component = component;
  return <Component key={name} />;
};
