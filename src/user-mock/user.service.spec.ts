import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserMockService } from './user.mock.service';

// We create some fake entiites, just for testing. Here they are empty,
// but they can be more complex, depending on the testing cases.
const subTasks = [new UserEntity(), new UserEntity(), new UserEntity()];

describe('TodosItemService', () => {
  let service: UserMockService; // Removed type, compared to the nestjs examples

  // We mock the responses of the two services. 
  // The mocks in this example are very simple, but they can be more complex, depending on the test cases.

  const mockedSubTaskService = {
    // mock the query method that is used by getWithSubTasks
    query: jest.fn((query) => Promise.resolve(subTasks)),
  };  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // Provide the original service
        UserMockService,
        // Mock the repository using the `getRepositoryToken` from @nestjs/typeorm
      ],
    }).compile();
    // get the service from the testing module.
    service = await module.get(UserMockService);
  });

  // reset call counts and called with arguments after each spec
  afterEach(() => jest.clearAllMocks());

  // Now we are ready to write the tests.
  describe('getWithSubTasks', () => {
    it('should return a TodoItem with subTasks', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOneOrFail method
      // create a spy for the mocked subTaskService query method
      const querySpy = jest.spyOn(mockedSubTaskService, 'query');

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // - the mocked subTask query service method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test

      // Ensure that the spies are called once with the appropriate arguments
      expect(querySpy).toHaveBeenCalledTimes(1);
      expect(querySpy).toHaveBeenCalledWith({ filter: { todoItemId: { eq: 123 } } });
    });
  });
});
