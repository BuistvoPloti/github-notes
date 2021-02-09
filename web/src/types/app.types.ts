export type RootState = {
  app: {
    initializedIsAuth: boolean,
  }
}

export type DispatchProps = {
  initializeApplication: () => void,
}
