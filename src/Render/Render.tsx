import * as React from 'react';
import { CompositionProps } from '../Composition';
import { RenderContext } from './Context';

const useFrame = (
  fps: number = 0,
  durationInFrames: number = 0,
  frameControl: {
    state: 'play' | 'pause' | 'stop';
    frame: number;
  }
) => {
  const [frame, setFrame] = React.useState(0);
  const frameIntervalRef = React.useRef<number>(null);

  React.useEffect(() => {
    if (frameControl.state === 'stop') {
      setFrame(0);
    } else if (frameControl.state === 'pause') {
      setFrame(frameControl.frame);
    } else {
      setFrame(frameControl.frame);
      const frameInterval = setInterval(() => {
        setFrame((f) => {
          if (f >= durationInFrames) {
            clearInterval(frameInterval);
            return f;
          }
          return f + 1;
        });
      }, Math.floor(1000 / fps));

      frameIntervalRef.current = frameInterval;
    }

    return () => {
      if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
    };
  }, [frameControl, fps, durationInFrames]);

  return frame;
};

interface RenderProps {
  children: React.ReactElement<CompositionProps>[];
}
export const Render: React.FC<RenderProps> = ({ children }) => {
  const [selectedComposition, setSelectedComposition] =
    React.useState<React.ReactElement<CompositionProps>>(null);

  const [frameControl, setFrameControl] = React.useState({
    state: 'stop' as 'play' | 'pause' | 'stop',
    frame: 0,
  });

  const frame = useFrame(
    selectedComposition?.props.fps,
    selectedComposition?.props.durationInFrames,
    frameControl
  );

  const names = React.Children.map(children, (c, i) => {
    return c.props.name;
  });

  const handleSelection = (name: string) => {
    React.Children.forEach(children, (c) => {
      if (c.props.name === name)
        setSelectedComposition(
          React.cloneElement(c, {
            key: name,
          })
        );
    });

    setFrameControl({
      frame: 0,
      state: 'stop',
    });
  };

  return (
    <React.Fragment>
      <div>
        {names.map((name) => {
          return <button onClick={() => handleSelection(name)}>{name}</button>;
        })}
      </div>
      <RenderContext.Provider
        value={{
          durationInFrames: selectedComposition?.props.durationInFrames,
          fps: selectedComposition?.props.fps,
          frame: frame,
          height: selectedComposition?.props.height,
          width: selectedComposition?.props.width,
        }}
      >
        <div>{selectedComposition}</div>
      </RenderContext.Provider>
      <div>controls</div>
      <button
        onClick={() => {
          setFrameControl((f) => ({
            state: 'stop',
            frame: 0,
          }));
        }}
      >
        Stop
      </button>
      <button
        onClick={() => {
          setFrameControl((f) => ({
            frame: frame,
            state: f.state === 'pause' || f.state === 'stop' ? 'play' : 'pause',
          }));
        }}
      >
        {frameControl.state === 'pause' || frameControl.state === 'stop'
          ? 'Play'
          : 'Pause'}
      </button>
      <br />
      <input
        style={{
          width: '100%',
        }}
        type="range"
        min={0}
        value={frameControl.state === 'play' ? frame : frameControl.frame}
        max={selectedComposition?.props.durationInFrames || 0}
        onChange={(e) => {
          setFrameControl((f) => ({
            state: f.state === 'stop' ? 'pause' : f.state,
            frame: Number(e.target.value),
          }));
        }}
      />
      <br />
      {frame} {Math.floor(frame / selectedComposition?.props.fps)}
    </React.Fragment>
  );
};
