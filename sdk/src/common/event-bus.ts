import { injectable, decorate } from 'inversify';
import { ReplaySubject, TimestampProvider } from 'rxjs';

decorate(injectable(), ReplaySubject);

@injectable()
export default class EventBus extends ReplaySubject<{
  data: unknown;
  event: string;
  args?: unknown;
}> {
  constructor(size?: number, time?: number, timeStampProvider?: TimestampProvider) {
    const _size = size || 42;
    const _time = time || 15000;
    const _timeStampProvider = timeStampProvider || Date;
    super(_size, _time, _timeStampProvider);
  }
}