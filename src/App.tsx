import { SampleService } from './components/sample-service';
import { Controls } from './components/controls';
import { LoopService } from './components/loop-service';

function App() {
  return (
    <SampleService samples={[
      { sampleName: 'kick', assetPath: '/kick.wav' },
      { sampleName: 'snare', assetPath: '/snare.wav' },
      { sampleName: 'hat', assetPath: '/hihat.wav' }
    ]}>
      <LoopService>
          <Controls />
      </LoopService>
    </SampleService>
  );
}

export default App;
