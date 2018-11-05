import {
  Component,
  Prop,
} from 'vue-property-decorator';
import { componentName } from '@/util';
import { API } from '@/api';
import TsxComponent from '@/vue-tsx';

interface Props {
  to?: object | null;
}

@Component({ name: componentName('BreadcrumbItem') })
@API.Component('Breadcrumb Item', comp => {
  comp.addEvent('click', 'Sent when item was clicked', event => {
    event.raw('item', 'BreadcrumbItem');
  });
})
export class BreadcrumbItem extends TsxComponent<Props> {
  @API.Prop('target route (passed to $router.to(…))', prop => prop.type(Object))
  @Prop({ type: Object, required: false, default: null })
  public to!: object | null;

  private onClick(event: MouseEvent) {
    event.preventDefault();
    const to = this.to;
    const router = this.$router;
    if (to != null && router != null) {
      router.push(to);
    }
    this.$emit('click', this);
  }

  public render() {
    const title = this.$slots.default;
    return (
      <li class='fd-breadcrumb__item'>
        <a class='fd-breadcrumb__link' href='#' on-click={event => this.onClick(event)}>{title}</a>
      </li>
    );
  }
}
