import React, { useState } from 'react';
import {
  render, screen, waitFor, act,
} from '@testing-library/react';
import Toast from './Toast';

describe('Toast', () => {
  jest.useFakeTimers();
  const testMessage = 'Test message';
  const ToastWrapper = () => {
    const [message, setMessage] = useState('');

    return (
      <>
        <Toast
          onClose={() => setMessage('')}
          message={message}
        />
        <button type="button" onClick={() => setMessage(testMessage)}>Show Toast</button>
      </>
    );
  };

  test('message disappears automatically', async () => {
    render(<ToastWrapper />);
    (await screen.findByText('Show Toast')).click();

    expect(await screen.findByText(testMessage)).toBeInTheDocument();
    act(() => jest.runAllTimers());
    await waitFor(() => expect(screen.queryByText(testMessage)).not.toBeInTheDocument());
  });
});
