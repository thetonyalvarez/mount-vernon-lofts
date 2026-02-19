import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { NeighborhoodMapSection } from "../NeighborhoodMapSection"

// Mock next/image since jsdom can't handle it
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

describe("NeighborhoodMapSection", () => {
  // --- STRUCTURE ---

  it("renders as a section element with proper landmark", () => {
    render(<NeighborhoodMapSection />)
    const section = screen.getByRole("region", { name: /points of interest/i })
    expect(section).toBeInTheDocument()
  })

  it("renders a section heading", () => {
    render(<NeighborhoodMapSection />)
    const heading = screen.getByRole("heading", { name: /explore the neighborhood/i })
    expect(heading).toBeInTheDocument()
  })

  it("renders a subtitle with proximity context", () => {
    render(<NeighborhoodMapSection />)
    expect(screen.getByText(/walking distance/i)).toBeInTheDocument()
  })

  // --- CATEGORY FILTERS ---

  it("renders filter buttons for each venue category", () => {
    render(<NeighborhoodMapSection />)
    expect(screen.getByRole("button", { name: /coffee/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /restaurants/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /parks/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /museums/i })).toBeInTheDocument()
  })

  it("renders an 'All' filter button that is active by default", () => {
    render(<NeighborhoodMapSection />)
    const allButton = screen.getByRole("button", { name: /all/i })
    expect(allButton).toBeInTheDocument()
    expect(allButton).toHaveAttribute("aria-pressed", "true")
  })

  it("sets aria-pressed on the active filter button", () => {
    render(<NeighborhoodMapSection />)
    const coffeeButton = screen.getByRole("button", { name: /coffee/i })
    fireEvent.click(coffeeButton)
    expect(coffeeButton).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("button", { name: /all/i })).toHaveAttribute(
      "aria-pressed",
      "false"
    )
  })

  // --- VENUE CARDS ---

  it("renders venue cards with name, address, and distance", () => {
    render(<NeighborhoodMapSection />)
    // Black Hole Coffee should be visible (from coffee category)
    expect(screen.getByText("Black Hole Coffee House")).toBeInTheDocument()
    expect(screen.getByText("4504 Graustark St")).toBeInTheDocument()
    const distanceElements = screen.getAllByText("~0.4 mi")
    expect(distanceElements.length).toBeGreaterThan(0)
  })

  it("renders venue notes as descriptions", () => {
    render(<NeighborhoodMapSection />)
    expect(
      screen.getByText(/open 6:30am-midnight daily/i)
    ).toBeInTheDocument()
  })

  it("renders links for venues that have a website", () => {
    render(<NeighborhoodMapSection />)
    const siphoLink = screen.getByRole("link", { name: /siphon coffee/i })
    expect(siphoLink).toHaveAttribute("href", "https://www.siphoncoffee.com")
    expect(siphoLink).toHaveAttribute("target", "_blank")
    expect(siphoLink).toHaveAttribute("rel", expect.stringContaining("noopener"))
  })

  it("renders instagram links for venues without a website", () => {
    render(<NeighborhoodMapSection />)
    const bhLink = screen.getByRole("link", { name: /black hole coffee/i })
    expect(bhLink).toHaveAttribute(
      "href",
      "https://www.instagram.com/blackholecoffee/"
    )
  })

  // --- FILTERING ---

  it("shows only coffee venues when coffee filter is active", () => {
    render(<NeighborhoodMapSection />)
    fireEvent.click(screen.getByRole("button", { name: /coffee/i }))

    expect(screen.getByText("Black Hole Coffee House")).toBeInTheDocument()
    expect(screen.getByText("Siphon Coffee")).toBeInTheDocument()
    expect(screen.getByText("Matcha Mia")).toBeInTheDocument()
    // Dining venues should not be visible
    expect(screen.queryByText("Hugo's")).not.toBeInTheDocument()
  })

  it("shows all venues when 'All' filter is clicked after filtering", () => {
    render(<NeighborhoodMapSection />)
    // Filter to coffee
    fireEvent.click(screen.getByRole("button", { name: /coffee/i }))
    expect(screen.queryByText("Hugo's")).not.toBeInTheDocument()
    // Back to all
    fireEvent.click(screen.getByRole("button", { name: /all/i }))
    expect(screen.getByText("Hugo's")).toBeInTheDocument()
    expect(screen.getByText("Black Hole Coffee House")).toBeInTheDocument()
  })

  // --- MAP EMBED ---

  it("renders an interactive map embed", () => {
    render(<NeighborhoodMapSection />)
    const iframe = screen.getByTitle(/mount vernon lofts neighborhood map/i)
    expect(iframe).toBeInTheDocument()
    expect(iframe.tagName).toBe("IFRAME")
  })

  it("map embed has proper loading and security attributes", () => {
    render(<NeighborhoodMapSection />)
    const iframe = screen.getByTitle(/mount vernon lofts neighborhood map/i)
    expect(iframe).toHaveAttribute("loading", "lazy")
    expect(iframe).toHaveAttribute("referrerPolicy", "no-referrer-when-downgrade")
  })

  // --- MVL MARKER ---

  it("shows Mount Vernon Lofts address as the map center reference", () => {
    render(<NeighborhoodMapSection />)
    expect(screen.getByText(/4509 Mount Vernon/i)).toBeInTheDocument()
  })

  // --- EXCLUDES 'NEARBY' CATEGORY ---

  it("does not render the 'nearby' category venues by default (not walkable)", () => {
    render(<NeighborhoodMapSection />)
    // "Worth the Short Drive" venues should not appear in the POI section
    expect(screen.queryByText("Tacos A Go Go")).not.toBeInTheDocument()
  })

  // --- ACCESSIBILITY ---

  it("filter buttons are in a group with proper label", () => {
    render(<NeighborhoodMapSection />)
    const group = screen.getByRole("group", { name: /filter/i })
    expect(group).toBeInTheDocument()
  })

  it("venue cards are in a list structure", () => {
    render(<NeighborhoodMapSection />)
    const list = screen.getByRole("list", { name: /neighborhood venues/i })
    expect(list).toBeInTheDocument()
    const items = screen.getAllByRole("listitem")
    expect(items.length).toBeGreaterThan(0)
  })
})
