"use client";

import { useState } from "react";
import { Download, FileClock, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  useInvoiceStatus,
  usePrepareInvoice,
} from "@/hooks/student/useOrder";
import { orderService } from "@/services/student/order.service";

const activeStatuses = new Set(["PENDING", "PROCESSING"]);
const CURRENT_TEMPLATE_VERSION = 2;

export default function InvoiceButton({ order, compact = false }) {
  const initialStatus = order?.invoice?.status ?? null;
  const [watchStatus, setWatchStatus] = useState(
    activeStatuses.has(initialStatus),
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const { data } = useInvoiceStatus(order?.id, watchStatus);
  const prepareInvoice = usePrepareInvoice(order?.id);

  if (order?.status !== "PAID") return null;

  const invoice = data?.data?.invoice ?? order?.invoice;
  const isOutdated =
    invoice?.status === "READY" &&
    invoice?.templateVersion !== CURRENT_TEMPLATE_VERSION;
  const status = isOutdated ? "OUTDATED" : (invoice?.status ?? null);
  const isPreparing = activeStatuses.has(status);

  const prepare = async () => {
    try {
      await prepareInvoice.mutateAsync();
      setWatchStatus(true);
      toast.success("Invoice generation started");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Could not prepare the invoice",
      );
    }
  };

  const download = async () => {
    setIsDownloading(true);
    try {
      const response = await orderService.downloadInvoice(order.id);
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${invoice?.invoiceNo ?? order.orderNo}-invoice.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast.success("Invoice downloaded");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Could not download the invoice",
      );
    } finally {
      setIsDownloading(false);
    }
  };

  if (status === "READY") {
    return (
      <Button
        type="button"
        size={compact ? "icon" : "sm"}
        variant="outline"
        onClick={download}
        disabled={isDownloading}
        title="Download invoice"
        className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
      >
        {isDownloading ? (
          <RefreshCw className="animate-spin" size={16} />
        ) : (
          <Download size={16} />
        )}
        {!compact && <span>{isDownloading ? "Downloading" : "Invoice"}</span>}
      </Button>
    );
  }

  if (isPreparing) {
    return (
      <Button
        type="button"
        size={compact ? "icon" : "sm"}
        variant="outline"
        disabled
        title="Invoice is being prepared"
      >
        <FileClock className="animate-pulse" size={16} />
        {!compact && <span>Preparing invoice</span>}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size={compact ? "icon" : "sm"}
      variant="outline"
      onClick={prepare}
      disabled={prepareInvoice.isPending}
      title={
        status === "FAILED"
          ? "Retry invoice"
          : status === "OUTDATED"
            ? "Update invoice design"
            : "Prepare invoice"
      }
    >
      {status === "FAILED" || status === "OUTDATED" ? (
        <RefreshCw size={16} />
      ) : (
        <FileClock size={16} />
      )}
      {!compact && (
        <span>
          {status === "FAILED"
            ? "Retry invoice"
            : status === "OUTDATED"
              ? "Update invoice"
              : "Prepare invoice"}
        </span>
      )}
    </Button>
  );
}
