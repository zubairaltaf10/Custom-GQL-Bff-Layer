import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
const types = loadFilesSync(__dirname);
export default mergeResolvers(types);
