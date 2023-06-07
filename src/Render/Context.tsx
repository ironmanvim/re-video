import * as React from 'react';

export const RenderContext = React.createContext({
  durationInFrames: 0,
  fps: 0,
  width: 0,
  height: 0,
  frame: 0,
});

export const useCurrentFrame = () => {
  const composition = React.useContext(RenderContext);
  return composition.frame;
};

export const useVideoConfig = () => {
  const composition = React.useContext(RenderContext);
  return {
    durationInFrames: composition.durationInFrames,
    fps: composition.fps,
    width: composition.width,
    height: composition.height,
  };
};
