import {
  Component,
  Prop,
} from 'vue-property-decorator';
import { API } from '@/api';
import { componentName } from '@/util';
import TsxComponent from '@/vue-tsx';

interface Props {
  ariaLabel?: string;
}

@Component({ name: componentName('Spinner') })
@API.Component('Spinner')
export class Spinner extends TsxComponent<Props> {
  @API.Prop('ARIA label', prop => prop.type(String))
  @Prop({ type: String, default: 'Loading', required: false })
  public ariaLabel!: string;

  public render() {
    return (
      <div class='fd-spinner' aria-hidden='false' aria-label={this.ariaLabel}>
        <div />
      </div>
    );
  }
}
