import { SampleService } from './components/sample-service';
import { LoopService } from './components/loop-service';
import { Controls } from './components/controls';
import { StateService } from './components/state-service';
import { OrchestrationService } from './components/orchestration-service';
import { Tracks } from './components/tracks';
import { Viz } from './components/viz';
import sampleKick from '../assets/kick.wav';
import sampleSnare from '../assets/snare.wav';
import sampleHat from '../assets/hihat.wav';

export const App = () => {
  return (
    <SampleService samples={[
      { sampleName: 'kick', assetPath: sampleKick },
      { sampleName: 'snare', assetPath: sampleSnare },
      { sampleName: 'hat', assetPath: sampleHat }
    ]}>
      <LoopService>
        <StateService>
          <OrchestrationService>
            <div className="h-screen p-[0.5rem] flex flex-col mx-auto max-w-[1000px]">
              <h1 className="text-[2.4rem] mb-[1.0rem] flex items-center">
                <a href="/">
                  <img src="/logo_black.svg" alt="logo" className="px-[1.0rem] h-[2.0rem]" />
                </a>
                Euclidean Rhythm Generator
              </h1>
              <div className="flex flex-col min-[768px]:flex-row grow overflow-y-hidden">
                <div className="min-[768px]:w-[300px]">
                  <Controls />
                  <Viz />
                </div>
                <div className="grow overflow-y-auto min-[768px]:pl-[1.0rem]">
                  <Tracks />
                </div>
              </div>
            </div>
          </OrchestrationService>
        </StateService>
      </LoopService>
    </SampleService>
  );
}

export default App;
