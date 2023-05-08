import { SampleService } from './components/sample-service';
// import { Controls } from './components/controls';
import { LoopService } from './components/loop-service';
import { Controls } from './components/controls';
import { StateService } from './components/state-service';
import { OrchestrationService } from './components/orchestration-service';

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
            <Controls />
          </OrchestrationService>
        </StateService>
      </LoopService>
    </SampleService>
  );
}

export default App;
