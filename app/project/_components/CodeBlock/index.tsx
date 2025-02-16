import React from "react";
import { PanelBottomClose, PanelBottomOpen } from "lucide-react";
import Tabs from "./tabs";
import Steps from "./steps";
import EditorCode from "./editor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Tabs as TabsRoot } from "@components/ui/tabs";
import { useOpen } from "@app/project/hooks/useOpenCode";
import PanelResizeHandleComp from "../utils/PanelResizeHandle";

type Props = {};

const CodeBlock = ({}: Props) => {
  const { openCode, handleOpenCode } = useOpen();
  const [BlockData, setBlockData] = React.useState<any>({});

  return (
    <>
      {openCode && <PanelResizeHandleComp />}
      <Tabs
        handleOpen={handleOpenCode}
        Open={openCode}
        BlockData={(item) => setBlockData(item)}
      />
      {openCode && (
        <Panel
          defaultSize={40}
          minSize={20}
          collapsible
          onCollapse={handleOpenCode}
        >
          <div className="w-full h-full bg-slate-800">
            <TabsRoot className="w-full h-full">
              <PanelGroup direction="horizontal">
                <Panel defaultSize={20} minSize={20} maxSize={50}>
                  <Steps />
                </Panel>
                <PanelResizeHandle className="p-[2px] cursor-row-resize hover:bg-blue-500" />
                <Panel defaultSize={80} minSize={20} maxSize={80}>
                  <EditorCode />
                </Panel>
              </PanelGroup>
            </TabsRoot>
          </div>
        </Panel>
      )}
    </>
  );
};

export default CodeBlock;
