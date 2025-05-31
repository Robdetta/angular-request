import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { App } from './app';
import { By } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, FormsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); // Make sure there are no outstanding requests
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the submit button when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('.api-btn'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });

  it('should disable the submit button when inputText is empty', () => {
    component.inputText = '';
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('.api-btn'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the submit button when inputText is not empty and loading is false', () => {
    component.inputText = 'Test message';
    component.loading = false;
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('.api-btn'));
    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should send the correct header with the request', () => {
    component.inputText = 'Test message';
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('.api-btn'));
    submitButton.nativeElement.click();

    const req = httpTestingController.expectOne(
      'https://sample.lteprocess.com/trythis',
    );
    expect(req.request.headers.has('sendthis')).toBe(true);
    expect(req.request.headers.get('sendthis')).toEqual('123Lucas');

    req.flush({ returnMessage: 'Success' }); // Provide a dummy response to complete the request
  });

  it('should send the correct message with the request', () => {
    component.inputText = 'Test message';
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('.api-btn'));
    submitButton.nativeElement.click();

    const req = httpTestingController.expectOne(
      'https://sample.lteprocess.com/trythis',
    );
    expect(req.request.body).toEqual({ message: 'Test message' });

    req.flush({ returnMessage: 'Success' });
  });

  it('should display the return message in the popup after a successful request', () => {
    const testMessage = 'Test message';
    component.inputText = testMessage;
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('.api-btn'));
    submitButton.nativeElement.click();

    const req = httpTestingController.expectOne(
      'https://sample.lteprocess.com/trythis',
    );
    req.flush({ returnMessage: testMessage });
    fixture.detectChanges();

    expect(component.popupMessage).toBe(testMessage);
    const modalMessage = fixture.debugElement.query(By.css('.modal-message'));
    expect(modalMessage.nativeElement.textContent).toContain(testMessage);
  });

  it('should clear the input text after a successful request', () => {
    component.inputText = 'Test message';
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('.api-btn'));
    submitButton.nativeElement.click();

    const req = httpTestingController.expectOne(
      'https://sample.lteprocess.com/trythis',
    );
    req.flush({ returnMessage: 'Success' });
    fixture.detectChanges();

    expect(component.inputText).toBe('');
  });

  it('should display an error message in the popup after a failed request', () => {
    component.inputText = 'Test message';
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('.api-btn'));
    submitButton.nativeElement.click();

    const req = httpTestingController.expectOne(
      'https://sample.lteprocess.com/trythis',
    );
    req.flush('Simulated error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
    fixture.detectChanges();

    expect(component.popupMessage).toContain('Error: Internal Server Error');
    const modalMessage = fixture.debugElement.query(By.css('.modal-message'));
    expect(modalMessage.nativeElement.textContent).toContain(
      'Error: Internal Server Error',
    );
  });
});
