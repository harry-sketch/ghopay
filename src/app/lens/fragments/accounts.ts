/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  MediaImageFragment,
  UsernameFragment,
  graphql,
} from "@lens-protocol/client";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const AccountMetadataFragment = graphql(
  `
    fragment AccountMetadata on AccountMetadata {
      name
      bio

      thumbnail: picture(
        request: { preferTransform: { fixedSize: { height: 128, width: 128 } } }
      )
      picture
    }
  `,
  [MediaImageFragment],
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const AccountFragment = graphql(
  `
    fragment Account on Account {
      __typename
      username {
        ...Username
      }
      address
      metadata {
        ...AccountMetadata
      }
    }
  `,
  [UsernameFragment, AccountMetadataFragment],
);
