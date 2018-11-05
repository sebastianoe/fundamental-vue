import {
  Component,
  Prop,
  Inject,
} from 'vue-property-decorator';
import { SideNavItem } from './SideNavItem';
import { SideNavList } from './SideNavList';
import { componentName } from '@/util';
import { API } from '@/api';
import TsxComponent from '@/vue-tsx';

interface Props {
  title?: string;
  itemId?: string | null;
}

@Component({
  name: componentName('SideNavSubmenu'),
  components: { SideNavItem },
  provide() {
    return {
      submenu: this,
    };
  },
})
@API.Component('Side Nav Submenu')
export class SideNavSubmenu extends TsxComponent<Props> {
  @API.Prop('item title', prop => prop.type(String))
  @Prop({ type: String, required: true, default: 'Title' })
  public title!: string;

  @API.Prop('unique item identification', prop => prop.type(String))
  @Prop({ type: String, default: null, required: false })
  public itemId!: string | null;

  @Inject({ default: null })
  public navList!: SideNavList | null;

  private itemsHidden = true;

  public didClickSideNavItem(item: SideNavItem) {
    const list = this.navList;
    if (list != null) {
      list.didClickSideNavItem(item);
    }
    this.itemsHidden = !this.itemsHidden;
  }
  public render() {
    const subitems = this.$slots.default;
    return (
      <SideNavItem itemId={this.itemId} hasChild={true}>
        {this.title}
        <ul slot={'sublist'} class='fd-side-nav__sublist' id='Rk65C501' aria-hidden={this.itemsHidden}>
          {subitems &&
            subitems
          }
        </ul>
      </SideNavItem>
    );
  }
}
