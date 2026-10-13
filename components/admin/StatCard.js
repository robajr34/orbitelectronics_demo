import React from "react";
import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";

export function StatCard({
  title,
  value,
  change,
  trend = "up",
  period = "vs previous period",
  icon: Icon,
  subtitle,
  tooltip,
  variant = "default",
}) {
  const isUp = trend === "up";
  const isNeutral = trend === "neutral";

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
          <span>{title}</span>
          {tooltip && (
            <span title={tooltip} className="cursor-help text-text-faint hover:text-foreground">
              <Info className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary transition-transform hover:scale-105">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-1.5 text-xs">
            {!isNeutral && (
              <span
                className={`inline-flex items-center rounded-md px-1.5 py-0.5 font-medium ${
                  isUp
                    ? "bg-success-soft text-success"
                    : "bg-danger-soft text-danger"
                }`}
              >
                {isUp ? (
                  <ArrowUpRight className="mr-0.5 h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="mr-0.5 h-3.5 w-3.5" />
                )}
                {change}
              </span>
            )}
            <span className="text-text-muted">{period}</span>
          </div>
        )}
        {subtitle && <p className="mt-1 text-xs text-text-muted">{subtitle}</p>}
      </div>
    </div>
  );
}
