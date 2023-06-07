import * as React from 'react';
import './style.css';
import { range } from 'lodash';
import { Composition } from './Composition';
import { interpolate } from './utils';
import { Render, useCurrentFrame, useVideoConfig } from './Render';

const EACH_COLOR_TIME = 3;

export default function App() {
  const fps = 60;

  return (
    <React.Fragment>
      <Render>
        <Composition
          name="first"
          durationInFrames={3 * EACH_COLOR_TIME * fps}
          fps={fps}
          width={1920}
          height={1080}
          component={MyComposition}
        />
        <Composition
          name="second"
          durationInFrames={2 * EACH_COLOR_TIME * fps}
          fps={fps}
          width={1920}
          height={1080}
          component={MyComposition}
        />
        <Composition
          name="third"
          durationInFrames={1 * EACH_COLOR_TIME * fps}
          fps={fps}
          width={1920}
          height={1080}
          component={MyComposition}
        />
      </Render>
    </React.Fragment>
  );
}

export function MyComposition() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const red = interpolate(
    frame,
    range(0, 6).map((i) => {
      let k = i % 2 === 0 ? i / 2 : (i + 1) / 2;
      return k * EACH_COLOR_TIME * fps;
    }),
    [255, 0, 0, 0, 0, 255]
  );
  const green = interpolate(
    frame,
    range(0, 6).map((i) => {
      let k = i % 2 === 0 ? i / 2 : (i + 1) / 2;
      return k * EACH_COLOR_TIME * fps;
    }),
    [0, 255, 255, 0, 0, 0]
  );
  const blue = interpolate(
    frame,
    range(0, 6).map((i) => {
      let k = i % 2 === 0 ? i / 2 : (i + 1) / 2;
      return k * EACH_COLOR_TIME * fps;
    }),
    [0, 0, 0, 255, 255, 0]
  );

  const open = interpolate(
    frame,
    [0, 60, 60, 80, 120, 240],
    [0, 1, 1, 0.5, 0.5, 1]
  );

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 200,
          height: 200,
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
          borderRadius: '100%',
          transform: `scale(${open})`,
          // color: 'white',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '100%',
            width: '20px',
            height: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mixBlendMode: 'difference',
          }}
        >
          {Math.floor(frame / fps)}
        </div>
      </div>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 30,
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
          // color: 'white',
          transform: `scaleX(${frame / durationInFrames})`,
          borderRadius: '100px',
        }}
      >
        <div
          style={{
            background: 'white',
            paddingLeft: '5px',
            paddingRight: '5px',
            mixBlendMode: 'difference',
            borderRadius: '10px',
          }}
        >
          {((frame / durationInFrames) * 100).toFixed(0)} %
        </div>
      </div>
    </div>
  );
}
