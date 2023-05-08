import { SampleService } from './components/sample-service';
import { LoopService } from './components/loop-service';
import { Controls } from './components/controls';
import { StateService } from './components/state-service';
import { OrchestrationService } from './components/orchestration-service';
import { Tracks } from './components/tracks';
import { Viz } from './components/viz';

function App() {
  return (
    <SampleService samples={[
      { sampleName: 'kick', assetPath: '/kick.wav' },
      { sampleName: 'snare', assetPath: '/snare.wav' },
      { sampleName: 'hat', assetPath: '/hihat.wav' }
    ]}>
      <LoopService>
        <StateService>
          <OrchestrationService>
            <div className="h-screen flex flex-col p-[0.5rem]">
              <h1 className="text-[2.4rem]">Euclidean Rhythm Generator</h1>
              <Controls />
              <Viz />
              <div className="grow overflow-y-auto">
                <Tracks />
              </div>
            </div>
          </OrchestrationService>
        </StateService>
      </LoopService>
    </SampleService>
  );
}

export default App;
