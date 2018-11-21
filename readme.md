# react-web3-components

A set components to create DApp interfaces using react.

The core component is `Web3Provider` which exposes a `web3` instance along with account state to nested components in this library using a specific react context (`Web3Context`). Other components can be nested anywhere in the virtual dom.

Available components:

- `Sign`: sign a message with the selected account.
- `Accounts`: the list of available accounts.
- `SelectedAccount`: the currently selected account.
- `NewAccount`: create a new account.
- `Unlock`: unlock the selected account.

## Use with Metamask

By default, the `Web3Provider` will use a `web3` instance using the browser's `givenProvider` (which is in most cases Metamask).

```js
<Web3Provider>
  <Sign message='hello'/>
</Web3Provider>
```

## Use a custom instance of `web3`

It is possible to specify a custom instance of `web3` to use, for example, with a WebSocket provider to connect to a local `geth` node.

```jsx
let wsWeb3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

const app = () => {
  <Web3Provider web3={wsWeb3}>
    ...
  </Web3Provider>
}
```

## Customize rendering

In general, component render can be customized using functions as child components. See below for properties available for each component.

Example – Login users using Metamask's signature:

```js
<Web3Provider>
  <Sign
    message='Login nonce: 1234'
    onSign={console.log}
    onError={console.error}
  >
    {
      ({
        message,
        disabled,
        selectedAccount,
        signAction,
      }) => (
        <div>
          <button disabled={disabled} onClick={signAction}>
            Login with <code>{`${!disabled && selectedAccount.substring(0, 6)}…`}</code>
          </button>
        </div>
      )
    }
  </Sign>
</Web3Provider>
```

## API

### `Web3Provider`, `Web3Context`

Handles update events and Metamask account access requests. Initializes and manages the context provided to other components.

Params:

`web3`: Specifies the web3 instance to use (default `new Web3(Web3.givenProvider)`).
`onUpdate`: A callback triggered each time accounts state changes.
`logger`: Possibly a custom logger handler.

Exposes a `Web3Context` provider which gives access to an object containing:

`web3`: The instance of web3 used by this provider.
`selectedAccount`: The selected account.
`accounts`: An array of all available accounts.
`updateAccounts`: A function to force update of the accounts state. This function receives a single optional parameter to specify the account that should be selected. If `null` the selected account will use the first available account.

### `Sign`

Sign a message with the selected account.

Params:

- `message`: The message to be signed, this can be either a `string` or a `Buffer` (default `''`).
- `password`: The password (if needed). This is needed for accounts protected with password as in `geth` accounts when using a WebSocket provider. Metamask doesn't need a password.
- `onSign`: A callback for accessing the resulting signature (default `() => {}`). The signature result is an object of the form:

  ```
    {
      signature,  // The hex formatted signature as returned by web3
      signedBy,   // The account that signed the message
      message,    // The original message
      hexMessage, // The hex formatted message
    }
  ```

- `onError`: A callback for handling errors if any (default `() => {}`). This function receives a single parameter, the error message.

Child function:

The child function for custom rendering receives an object containing:

- `message`: The message to be signed.
- `disabled`: `true` if no account selected, `false` otherwise.
- `selectedAccount`: The account that will sign the message.
- `signAction`: The action that, when triggered, will request the signature.

### `SelectedAccount`

Shows the currently selected account.

Params:

- none

Child function:

The child function for custom rendering receives an object containing:

- `selectedAccount`: The selected address.

### `Accounts`

Shows the list of available accounts and allows to select an account when many available (such as when connecting to a `geth` instance with a WebSocket web3 provider).

Params:

- none

Child function:

The child function for custom rendering receives an object containing:

- `selectedAccount`: The selected address.
- `accounts`: An array of all available accounts.
- `updateAccounts`: A function to set the selected account and update the list of available accounts.

### `NewAccount`

Creates a new account and if succeeds, sets it as the selected account (Doesn't work with Metamask).

Params:
- `password`: The password for the newly created account (default `''`)
- `onCreate`: A callback for accessing the newly created account (default `() => {}`). This function receives a single parameter, the new address.
- `onError`: A callback for handling errors if any (default `() => {}`). This function receives a single parameter, the error message.

Child function:

The child function for custom rendering receives an object containing:

- `newAccountAction`: The action that, when triggered, will create a new account.

### `Unlock`

Unlock the selected account (Doesn't work with Metamask).

Params:

- `password`: The password for unlocking the account (default `''`).
- `duration`: The duration for unlocking the account (default `0`).
- `onUnlock`: A callback called when the account was unlocked (default `() => {}`). This function receives a single parameter, `true` if the account was unlocked.
- `onError`: A callback for handling errors if any (default `() => {}`). This function receives a single parameter, the error message.

Child function:

The child function for custom rendering receives an object containing:

- `selectedAccount`: The selected address.
- `duration`: The duration for unlocking the account.
- `unlockAction`: The action that, when triggered, will request the account unlocking.
- `disabled`: `true` if no account selected, `false` otherwise.
