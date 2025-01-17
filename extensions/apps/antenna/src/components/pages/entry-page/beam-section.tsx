import React, { useState } from 'react';
import EditorPlaceholder from '@akashaorg/design-system-components/lib/components/EditorPlaceholder';
import Divider from '@akashaorg/design-system-core/lib/components/Divider';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import BeamCard from '@akashaorg/ui-lib-feed/lib/components/cards/beam-card';
import ReflectEditor from '../../reflect-editor';
import routes, { REFLECT } from '../../../routes';
import { useTranslation } from 'react-i18next';
import { BeamEntryData, type ReflectEntryData } from '@akashaorg/typings/lib/ui';
import { createReactiveVar, hasOwn, transformSource } from '@akashaorg/ui-awf-hooks';
import { useRouterState } from '@tanstack/react-router';
import { useCloseActions } from '@akashaorg/design-system-core/lib/utils';
import { PendingReflect } from '../../reflect-editor/pending-reflect';
import { usePendingReflections } from '@akashaorg/ui-awf-hooks/lib/use-pending-reflections';

type BeamSectionProps = {
  beamId: string;
  entryData: BeamEntryData;
  isLoggedIn: boolean;
  showNSFWCard: boolean;
  pendingReflectionsVar: ReturnType<typeof createReactiveVar<ReflectEntryData[]>>;
  parentWrapperRef: React.MutableRefObject<unknown>;
  showLoginModal: (title?: string, message?: string) => void;
};

const BeamSection: React.FC<BeamSectionProps> = props => {
  const {
    beamId,
    entryData,
    isLoggedIn,
    showNSFWCard,
    pendingReflectionsVar,
    parentWrapperRef,
    showLoginModal,
  } = props;
  const { t } = useTranslation('app-antenna');
  const routerState = useRouterState();
  const [isReflecting, setIsReflecting] = useState(
    routerState.location.pathname.endsWith(routes[REFLECT]),
  );

  const { pendingReflections } = usePendingReflections(pendingReflectionsVar);

  useCloseActions(() => {
    setIsReflecting(false);
  }, parentWrapperRef);

  return (
    <Stack spacing="gap-y-2">
      <Stack>
        <BeamCard
          entryData={entryData}
          noWrapperCard={true}
          contentClickable={false}
          showHiddenContent={true}
          showNSFWCard={showNSFWCard}
          showLoginModal={showLoginModal}
          onReflect={() => {
            if (!isLoggedIn) {
              showLoginModal(
                'Member Only Feature',
                'You need to connect first to be able to use this feature.',
              );
              return;
            }
            setIsReflecting(!isReflecting);
          }}
        />
        <Divider />
      </Stack>
      <Stack padding="px-2">
        {!isLoggedIn && (
          <EditorPlaceholder
            onClick={() =>
              showLoginModal(
                'Member Only Feature',
                'You need to connect first to be able to use this feature.',
              )
            }
            profileId={null}
            actionLabel={t('Reflect')}
            placeholderLabel={t('Share your thoughts')}
            transformSource={transformSource}
          />
        )}
        {isLoggedIn && entryData?.active && (
          <ReflectEditor
            beamId={beamId}
            reflectToId={beamId}
            showEditor={isReflecting}
            setShowEditor={setIsReflecting}
            pendingReflectionsVar={pendingReflectionsVar}
          />
        )}
        {pendingReflections
          .filter(content => !hasOwn(content, 'reflection') && content.beamID === beamId)
          .map((content, index) => (
            <PendingReflect key={`pending-${index}-${beamId}`} entryData={content} />
          ))}
      </Stack>
    </Stack>
  );
};

export default BeamSection;
