import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from "@angular/core";
import { Options } from "./interfaces/Options";

interface PlatformContext {
  $implicit: Options;
}

@Directive({
  selector: "ng-template[platformRef]",
  standalone: true,
})
export class PlatformDirective implements OnInit {
  @Input() platformRef!: string;
  @Input() platform!: Options[];

  readonly #viewContainerRef = inject(ViewContainerRef);
  readonly #templateRef = inject(TemplateRef<PlatformContext>);

  ngOnInit(): void {
    const context = {
      $implicit: this.platform,
      platform: this.platformRef,
      name: this.platform,
    };
    this.#viewContainerRef.createEmbeddedView(this.#templateRef, context);
  }

  static ngTemplateContextGuard(
    directive: PlatformDirective,
    context: unknown,
  ): context is PlatformContext {
    return true;
  }
}
