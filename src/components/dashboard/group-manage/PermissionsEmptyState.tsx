"use client";

interface PermissionsEmptyStateProps {
  query?: string;
}

export default function PermissionsEmptyState({ query }: PermissionsEmptyStateProps): JSX.Element {
  return (
    <div className="text-center py-16">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
        <i className="fas fa-shield-halved text-2xl text-gray-500 dark:text-gray-300" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No permissions found</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {query ? (
          <>
            We couldn't find any permissions matching "{query}". Try a different search.
          </>
        ) : (
          <>There are no permissions to display.</>
        )}
      </p>
    </div>
  );
}

