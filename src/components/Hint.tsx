import { styled } from '@linaria/react';
import { Tooltip } from 'radix-ui';
import { ReactNode, CSSProperties, createContext, useState } from 'react';

import { COLORS, WEIGHTS } from '@/constants';

import { useTheme } from '@/components/ThemeProvider';
import React from 'react';

type TooltipTriggerContextType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TooltipTriggerContext = createContext<TooltipTriggerContextType>({
    open: false,
    setOpen: () => { },
});

const TooltipRoot: React.FC<Tooltip.TooltipProps> = ({ children, ...props }) => {
    const [open, setOpen] = React.useState<boolean>(props.defaultOpen ?? false);

    const isMd = true;

    return (
        <Tooltip.Root
            delayDuration={isMd ? props.delayDuration : 0}
            onOpenChange={(e) => {
                setOpen(e);
            }}
            open={open}
        >
            <TooltipTriggerContext.Provider value={{ open, setOpen }}>
                {children}
            </TooltipTriggerContext.Provider>
        </Tooltip.Root>
    );
};

const TooltipTrigger = React.forwardRef<
    React.ElementRef<typeof Tooltip.Trigger>,
    React.ComponentPropsWithoutRef<typeof Tooltip.Trigger>
>(({ children, ...props }, ref) => {
    const isMd = true;
    const { setOpen } = React.useContext(TooltipTriggerContext);

    return (
        <Tooltip.Trigger
            ref={ref}
            {...props}
            onClick={(e) => {
                !isMd && e.preventDefault();
                setOpen(true);
            }}
        >
            {children}
        </Tooltip.Trigger>
    );
});

const Hint = ({ children, hintContent }: { children: ReactNode, hintContent: ReactNode }) => {
    const { theme } = useTheme();

    return (
        <TooltipRoot>
            <TooltipTrigger asChild>
                <Wrapper>
                    {children}
                    <HintSignifier>?</HintSignifier>
                </Wrapper>
            </TooltipTrigger>
            <Tooltip.Portal>
                <Content style={{
                    '--color-highlight': theme === 'light' ? COLORS.highlight.dark : COLORS.highlight.light
                } as CSSProperties}>
                    {hintContent}
                    < Arrow />
                </Content>
            </Tooltip.Portal>
        </TooltipRoot >
    )
}


Hint.Bold = styled.strong`
            font-weight: ${WEIGHTS.bold};
            `;

const Wrapper = styled.span`
            cursor: help;
            `;

const HintSignifier = styled.sup`
            line-height: 1;
            font-weight: ${WEIGHTS.bold};
            color: var(--color-primary);
            `;

const Content = styled(Tooltip.Content)`
            @keyframes slideDownAndFade {
                from {
                opacity: 0;
            transform: translateY(-2px);
    }
            to {
                opacity: 1;
            transform: translateY(0);
    }
  }

            hyphens: manual;
            text-align: center;
            font-size: ${16 / 16}rem;
            font-weight: ${WEIGHTS.medium};
            max-width: 312px;
            border-radius: 8px;
            padding: 8px 16px;
            background: var(--color-text);
            color: var(--color-background);
            animation: slideDownAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1);
            `;

const Arrow = styled(Tooltip.Arrow)`
            fill: var(--color-text);
            `;

export { Hint };
