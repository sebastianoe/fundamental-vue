import {
  Component,
  Prop,
} from 'vue-property-decorator';
import { API } from '@/api';
import { componentName } from '@/util';
import { Color, Colors, backgroundColorClassName } from '@/lib';
import TsxComponent from '@/vue-tsx';

const sizeMapping = {
  s: 'Small',
  m: 'Medium (default)',
  l: 'Large',
};
type IdentifierSize = keyof (typeof sizeMapping);
const IdentifierSizes = Object.keys(sizeMapping) as IdentifierSize[];

interface Props {
  icon?: string | null;
  size?: IdentifierSize;
  circle?: boolean;
  transparent?: boolean;
  backgroundColor?: Color | null;
}

@Component({ name: componentName('Identifier') })
@API.Component('Identifier')
export class Identifier extends TsxComponent<Props> {
  @API.Prop('icon name', prop => prop.type(String))
  @Prop({ type: String, default: null, required: false })
  public icon!: string | null;

  @API.Prop('size', prop => prop.type(String).acceptValues(...IdentifierSizes))
  @Prop({ type: String, default: 'm', required: false })
  public size!: IdentifierSize;

  @API.Prop('is displayed as circle', prop => prop.type(Boolean))
  @Prop({ required: false, default: false, type: Boolean })
  public circle!: boolean;

  @API.Prop('is displayed without background', prop => prop.type(Boolean))
  @Prop({ required: false, default: false, type: Boolean })
  public transparent!: boolean;

  @API.Prop('background color', prop => prop.type(String).acceptValues(...Colors))
  @Prop({ required: false, default: null, type: String })
  public backgroundColor!: Color | null;

  public render() {
    return <span class={this.classes} role='presentation'>{this.$slots.default}</span>;
  }

  private get classes() {
    const backgroundColorClasses = this.backgroundColor == null ? {} : { [backgroundColorClassName(this.backgroundColor)]: true };
    const iconClass = this.icon == null ? {} : { [`sap-icon--${this.icon}`]: true };
    return {
      ...iconClass,
      ...backgroundColorClasses,
      'fd-identifier--s': this.size === 's',
      'fd-identifier--l': this.size === 'l',
      'fd-identifier--m': this.size === 'm',
      'fd-identifier--transparent': this.transparent,
      'fd-identifier--circle': this.circle,
    };
  }
}
