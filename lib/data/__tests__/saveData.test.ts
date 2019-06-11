import { saveData } from '../graphql';

describe('saveData', () => {
  describe('given an onCompleted prop', () => {
    it('should run it with data argument', async () => {
      const client = {
        mutate: () => Promise.resolve({
          data: {
            login: 'success',
          }
        }),
      };

      const onCompleted = jest.fn();

      const props = {
        client: client as any, // tslint:disable-line no-any
        mutation: null as any, // tslint:disable-line no-any
        onCompleted,
      };

      const result = await saveData(props, {});
      expect(result).toBeUndefined();
      expect(onCompleted).toHaveBeenCalledWith({ login: 'success' });
    });

    it('should not run if mutation has errors', async () => {
        const client = {
          mutate: () => Promise.resolve({
            errors: [],
          }),
        };

        const onCompleted = jest.fn();

        const props = {
          client: client as any, // tslint:disable-line no-any
          mutation: null as any, // tslint:disable-line no-any
          onCompleted,
        };

        const result = await saveData(props, {});
        expect(result).toEqual({});
        expect(onCompleted).not.toHaveBeenCalled();
    });
  });
});
