import { FC } from 'react';
import { Engine, Scene } from 'react-babylonjs';
import { Color4, Vector3 } from '@babylonjs/core';


const BouncyScene: FC = () => {
  return (
    <Engine antialias adaptToDeviceRatio canvasId={'bouncy-scene-canvas'}>
      <Scene clearColor={new Color4(0, 0, 0, 0)}>
        <arcRotateCamera name='camera1' target={Vector3.Zero()} alpha={0} beta={0} radius={20} />
        <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()} />
        <box name={'box-1'} size={2} position={Vector3.Zero()}>
        </box>
      </Scene>
    </Engine>
  );
};


const InteractiveBackground: FC = () => {
  return (<>
    <style jsx global>{`
      canvas#bouncy-scene-canvas {
        width: 100%;
        height: 100%;
        background: transparent;
      }
    `}</style>

    <div className={'fixed block w-full h-full overflow-hidden -z-10 flex'}>
      <div className={'flex-auto'}>
        <BouncyScene />
      </div>
    </div>
  </>);
};

export default InteractiveBackground;