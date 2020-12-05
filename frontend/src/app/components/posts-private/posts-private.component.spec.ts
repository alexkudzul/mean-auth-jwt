import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPrivateComponent } from './posts-private.component';

describe('PostsPrivateComponent', () => {
  let component: PostsPrivateComponent;
  let fixture: ComponentFixture<PostsPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
